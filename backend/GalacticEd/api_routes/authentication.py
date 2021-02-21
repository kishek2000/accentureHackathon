from flask import (
    Blueprint,
    render_template,
    request,
    session
)
import os
from GalacticEd.models import User
from GalacticEd.database_ops import (
    get_all_users,
    save_user
)
from GalacticEd.utils.colourisation import printColoured

# TODO: continue on https://www.youtube.com/watch?v=2Zz97NVbH0U&t=1207s&ab_channel=PrettyPrinted

auth_router = Blueprint("auth", __name__)

@auth_router.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        printColoured("User is attempting to log in")
        user_email = request.form["email"]
        user_password = request.form["password"]

        printColoured("{} {}".format(user_email, user_password))

        # session["user_id"] = user

        return {
            "user_id": user.id
        }
    else:
        return render_template("login.html")

@auth_router.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        printColoured("User is attempting to register")
        user_name = request.form["username"]
        user_email = request.form["email"]
        user_password = request.form["password"]

        printColoured("Name: {}, email: {}, password: {}".format(user_name, user_email, user_password))

        new_user = User(name=user_name, email=user_email, password=user_password)
        new_user_id = save_user(new_user)
        # session["user_id"] = new_user_id

        return {
            "user_id": new_user_id
        }
    else:
        printColoured("Registering page")
        return render_template("register.html")
