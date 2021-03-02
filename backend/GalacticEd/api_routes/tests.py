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
    get_courses_lessons,
    get_courses_all
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
    courses_lessons = [ course for course in get_courses_lessons() ]
    courses_all = [ course for course in get_courses_all() ]
    return render_template(
        "database.html", 
        users=users,
        courses_lessons=courses_lessons,
        courses_all=courses_all
    )

@test_router.route("/db", methods=["POST"])
def db_wipe_users():
    """ Wipes all users from the database (drops the 'users' named collection) """
    printColoured("Wiping all users")
    wipe_all_users()
    return render_template("database.html")
