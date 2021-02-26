# Some basic routes for testing the connection to the back end and other simple experiments
from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    g
)
from GalacticEd.database_ops import (
    get_all_users,
    wipe_all_users
)
from GalacticEd.utils.colourisation import printColoured

test_router = Blueprint("test", __name__)

@test_router.route("/")
def index():
    """ Landing page """
    return render_template(
        "landing.html", 
        # user={
        #     "name": "Tim", 
        #     "email": "timzhang3@gmail.com", 
        #     "image": "https://post.healthline.com/wp-content/uploads/2020/08/10889-The_Watermelon_Diet_Fact_or_Fiction-_732x549-thumbnail-732x549.jpg"
        # }
    )

@test_router.route("/db")
def db_users():
    """ Querying the database and displaying results """
    users = [ user for user in get_all_users() ]
    return render_template("database.html", users=users)

@test_router.route("/db", methods=["POST"])
def db_wipe_users():
    """ Wipes all users from the database (drops the 'users' named collection) """
    printColoured("Wiping all users")
    wipe_all_users()
    return render_template("database.html")
