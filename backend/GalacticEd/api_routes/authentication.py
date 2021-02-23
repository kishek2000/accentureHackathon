from flask import (
    Blueprint,
    render_template,
    request
)
import os
from GalacticEd.models import User
from GalacticEd.database_ops import (
    get_all_users,
    save_user,
    get_user,
    password_verified
)
from GalacticEd.exceptions import InvalidUserInput
from GalacticEd.utils.colourisation import printColoured

auth_router = Blueprint("auth", __name__)

@auth_router.route("/login", methods=["GET", "POST"])
def login():
    """
        TODO: Login documentation 
    """
    if request.method == "POST":
        user_email = request.form["email"]
        user_password = request.form["password"]

        if password_verified(user_email, user_password):
            printColoured(" ➤ Logged in successfully")
            user = get_user(email=user_email)

            return {
                "user_id": user.id
            }
        else:
            raise InvalidUserInput(description="The password doesn't match the provided email")
    else:
        return render_template("login.html")

@auth_router.route("/register", methods=["GET", "POST"])
def register():
    """
        TODO: Register documentation 
    """
    if request.method == "POST":
        user_name = request.form["username"]
        user_email = request.form["email"]
        user_password = request.form["password"]

        printColoured(" ➤ Registered a user with details: name: {}, email: {}, password: {}".format(user_name, user_email, user_password))

        new_user = User(name=user_name, email=user_email, password=user_password)
        new_user.commit_user()

        return {
            "user_id": new_user.id
        }
    else:
        return render_template("register.html")
