from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    jsonify
)
import os
from GalacticEd.models import User
from GalacticEd.exceptions import InvalidUserInput
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.authentication import (
    login,
    register,
    register_child,
    remove_user
)

# Google auth dependencies:
import requests
import json
from GalacticEd import (
    GOOGLE_DISCOVERY_URL,
    GOOGLE_API_CLIENT_ID,
    GOOGLE_API_CLIENT_SECRET,
    google_client
)

auth_router = Blueprint("auth", __name__)

@auth_router.route("/login", methods=["GET", "POST"])
def login_handler():
    """
        Given form data containing fields: email and password, fetches the corresponding 
        user from the database and verifies the password. 

        Returns:
            user_data: json containing fields: { user_id, token } 
    """
    if request.method == "POST":
        user_email = request.form["email"]
        user_password = request.form["password"]
        return jsonify(login(user_email, user_password))
    else:
        return render_template("login.html")

@auth_router.route("/register", methods=["GET", "POST"])
def register_handler():
    """
        Given form data containing fields: username, email and password, instantiates
        and saves a new user to the database

        Returns:
            user_data: json containing fields: { user_id } 
    """
    if request.method == "POST":
        try:
            user_name = request.form["username"]
            user_email = request.form["email"]
            user_password = request.form["password"]
            user_confirm_password = request.form["confirm_password"]
            return jsonify(register(user_name, user_email, user_password, user_confirm_password))
        except:
            raise InvalidUserInput(description="Invalid or missing fields. Check the form you submitted again")
    else:
        return render_template("register.html")

@auth_router.route("/registerchild", methods=["POST"])
def child_register_handler():
    """
        TODO: documentation
        Params:
            user_id
            token
    """
    try:
        user_id = request.form["user_id"]
        return jsonify(register_child({
            "name": request.form["name"],
            "avatar": request.form["avatar"],
            "birthday": request.form["birthday"],
            "learning_style": request.form["learning_style"],
            "attention_span": request.form["attention_span"],
            "favourite_object": request.form["favourite_object"]
        }, user_id))
    except:
        raise InvalidUserInput(description="Invalid or missing fields, most likely.")

@auth_router.route("/remove", methods=["DELETE"])
def remove_user_handler():
    """
        TODO: UNPROTECTED. This is just for convenience
        Params:
            email 
    """
    email = request.form["email"]
    user = remove_user(email)
    return jsonify({
        "deleted_user": True
    })

# ===== Google Authentication =====

# TODO: Tip: To make this more robust, you should add error handling to the Google API call, just in case Google’s API returns a failure and not the valid provider configuration document.
def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

@auth_router.route("/google/login")
def google_login_handler():
    """
        When this route is hit, the user is directed to Google's authentication
        page where they will choose a Google account to log in with.
    """
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = google_client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri="https://127.0.0.1:5000/api/auth/google/login/callback",
        scope=["openid", "email", "profile"],
    )
    printColoured("REDIRECTING NOW", colour="blue")
    printColoured("Request URI: {}".format(request_uri))
    return redirect(request_uri)

@auth_router.route("/google/login/callback")
def google_login_callback_handler():
    """
        This is the route hit by Google's API. The exact URL is specified in the
        develop console: https://console.developers.google.com/
    """
    printColoured("CLIENT_ID : {}, CLIENT_SECRET: {}".format(GOOGLE_API_CLIENT_ID, GOOGLE_API_CLIENT_SECRET), colour="yellow")
    # Get authorization code Google sent back to you
    code = request.args.get("code")

    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Prepare and send a request to get tokens! Yay tokens!
    token_url, headers, body = google_client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )


    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_API_CLIENT_ID, GOOGLE_API_CLIENT_SECRET),
    )

    # Parse the tokens!
    google_client.parse_request_body_response(json.dumps(token_response.json()))

    # Now that you have tokens (yay) let's find and hit the URL
    # from Google that gives you the user's profile information,
    # including their Google profile image and email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = google_client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    # You want to make sure their email is verified.
    # The user authenticated with Google, authorized your
    # app, and now you've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        user_email = userinfo_response.json()["email"]
        user_image = userinfo_response.json()["picture"]
        user_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    # Create a user in your db with the information provided
    # by Google
    printColoured(
        " ➤ GOOGLE API: Registered a user with details: name: {}, email: {}, image: {}".format(
            user_name, 
            user_email, 
            user_image
        )
    )

    new_user = User(name=user_name, email=user_email, password="test123")
    new_user.commit_user()
    printColoured("COMMITTED THE USER")

    # Send user back to homepage
    return """
        <h3>You've logged in successfully!</h3> 
        <div>Name: {}, Email: {}</div>
        <img src='{}'></img>
    """.format(user_name, user_email, user_image)
