from GalacticEd import app
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.models import User
import os
from flask import (
    redirect, 
    g,        
    url_for,
    request,
    render_template,
    session
)
from mongoengine import connect


# TODO: move this to __init__.py
app.secret_key = "senpai"


# TODO: Use blueprints and move routes out of this file and into the api_routes/ directory

@app.route("/")
def index():
    return "Hello World"

@app.route("/db")
def db_users():
    users = [
        {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "password": user.password
        } for user in User.objects 
    ]
    return render_template("database.html", users=users)

@app.route("/db", methods=["POST"])
def db_wipe_users():
    printColoured("Wiping all users")
    User.drop_collection()
    return redirect("db")


# @app.before_request

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        printColoured("User is attempting to log in")
        user_email = request.form["email"]
        user_password = request.form["password"]

        printColoured("{} {}".format(user_email, user_password))

        session["user_id"] = user

        return {
            "user_id": user.id
        }
    else:
        return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        printColoured("User is attempting to register")
        user_name = request.form["username"]
        user_email = request.form["email"]
        user_password = request.form["password"]

        printColoured("Name: {}, email: {}, password: {}".format(user_name, user_email, user_password))

        new_user = User(name=user_name, email=user_email, password=user_password)
        new_user.save()
        session["user_id"] = str(new_user.id)

        return {
            "user_id": str(new_user.id)
        }
    else:
        printColoured("Registering page")
        return render_template("register.html")
