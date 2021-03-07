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
    get_stats,
    get_user
)

profile_router = Blueprint("profile", __name__)

@profile_router.route("/", methods=["GET"])
def profile_data_fetch_handler():
    """
        Given a user_id and token, gets the target user's profile data
    """
    user_id = request.args.get("user_id")
    profile_data = get_user(user_id=user_id)
    printColoured(" > Fetched user profile: {}".format(profile_data))
    return jsonify(profile_data)

@profile_router.route("/stats", methods=["GET"])
def profile_stats_fetch_handler():
    """
        Given a user_id and token, get their children's associated stats
    """
    user_id = request.args.get("user_id")
    printColoured(" > user_id: {}".format(user_id))
    stats = get_stats(user_id)
    return jsonify(stats)

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

