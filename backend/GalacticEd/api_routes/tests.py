"""
Some basic routes for testing the connection to the back end and other simple 
experiments.
"""
from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    g
)
from GalacticEd.database_ops import (
    get_all_users,
    wipe_all_users,
    get_all_courses
)
from GalacticEd.utils.colourisation import printColoured

test_router = Blueprint("test", __name__)

@test_router.route("/")
def index():
    """ Landing page """
    return render_template(
        "landing.html", 
    )

@test_router.route("/db")
def db_users():
    """ Querying the database and displaying results """
    users = [ user for user in get_all_users() ]
    courses = [ course for course in get_all_courses() ]
    return render_template(
        "database.html", 
        users=users,
        courses=courses
    )

@test_router.route("/db", methods=["POST"])
def db_wipe_users():
    """ Wipes all users from the database (drops the 'users' named collection) """
    printColoured("Wiping all users")
    wipe_all_users()
    return render_template("database.html")
