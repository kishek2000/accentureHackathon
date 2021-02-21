# Some basic routes for testing the connection to the back end and other simple experiments
from flask import (
    Blueprint,
    render_template,
    request,
    redirect
)
from GalacticEd.database_ops import (
    get_all_users,
    wipe_all_users
)
from GalacticEd.utils.colourisation import printColoured

test_router = Blueprint("test", __name__)

@test_router.route("/")
def index():
    return "Hello World"

@test_router.route("/db")
def db_users():
    users = [ user for user in get_all_users() ]
    return render_template("database.html", users=users)

@test_router.route("/db", methods=["POST"])
def db_wipe_users():
    printColoured("Wiping all users")
    wipe_all_users()
    return render_template("database.html")
