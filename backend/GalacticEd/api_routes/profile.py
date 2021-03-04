"""
Route handlers for fetching profile data and learning statistics about a 
particular user
"""

from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    jsonify
)
from GalacticEd.models import User
from GalacticEd.exceptions import InvalidUserInput
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.database_ops import (
    get_courses_lessons,
    get_courses_all,
    get_stats
)

profile_router = Blueprint("profile", __name__)

"""
    TODO
    Define an endpoint: GET /api/user

    Parameters of the request:
        <USER_ID>

    Returns details about a particular user. 
    Eg. what their username is, etc.

    TODO: This may not be necessary
"""
@profile_router.route("/stats", methods=["GET"])
def profile_stats_fetch_handler():
    """
        Given a user_id, get their associated stats
    """
    user_id = request.args.get("user_id")
    printColoured(" > user_id: {}".format(user_id))
    stats = get_stats(user_id)
    return jsonify(stats)

"""
    Parameters of the request:
        <USER_ID>
        <COURSE TO GRAB STATISTICS FROM>
        <TIME SPAN OF STATS>
"""
@profile_router.route("/stats", methods=["POST"])
def profile_stats_push_handler():
    """
        TODO
    """
    request_data = request.get_json()

    # user_id = request_data["user_id"]
    # time_taken = request_data["time_taken"]
    # num_incorrect = request_data["num_incorrect"] 
    # details = request_data["details"]
    printColoured(" ➤ Posting stats for user_id: {}".format(user_id))

