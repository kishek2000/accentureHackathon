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
    get_user,
    save_stats,
    get_lesson_difficulty,
    clear_child_stats
)
from GalacticEd.utils.debug import pretty

profile_router = Blueprint("profile", __name__)

@profile_router.route("/", methods=["GET"])
def profile_data_fetch_handler():
    """
        Given a user_id and token, gets the target user's profile data
    """
    user_id = request.args.get("user_id")
    profile_data = get_user(user_id=user_id)
    printColoured(" ➤ Fetched user profile of: {}".format(user_id))
    return jsonify(profile_data)

@profile_router.route("/stats", methods=["GET"])
def profile_stats_fetch_handler():
    """
        Given a user_id and token, get their children's associated stats
    """
    user_id = request.args.get("user_id")
    printColoured(" ➤ Getting child stats: {}".format(user_id))
    stats = get_stats(user_id)
    return jsonify(stats)

@profile_router.route("/stats", methods=["POST"])
def profile_stats_push_handler():
    """
        Params:
            - user_id  (str)
            - child_id (str)
            - course_id (str)
            - lesson_id (str)
            - time_on_completion (integer timestamp in seconds)
            - num_incorrect (int)
            - time_taken (float or int)
    """
    request_data = dict(request.form)
    printColoured(" ➤ A child has just completed a lesson! Received some stats to commit:")
    pretty(request_data)

    # try:
    course_id = request_data["course_id"]
    lesson_id = request_data["lesson_id"]
    difficulty = get_lesson_difficulty(
        course_id, 
        lesson_id
    )
    return jsonify(save_stats({
        "course_id": course_id,
        "lesson_id": lesson_id,
        "num_incorrect": request_data["num_incorrect"],
        "time_taken": request_data["time_taken"],
        "time_on_completion": request_data["time_on_completion"],
        "difficulty": difficulty
    }, request_data["user_id"], request_data["child_id"]))
    # except:
    #     pass
        # raise InvalidUserInput(description="Invalid or missing stats fields")


@profile_router.route("/stats", methods=["DELETE"])
def profile_stats_wipe_handler():
    """
        TODO this is just for testing convenience. Removes a target child's stats
        Params:
            - user_id  (str)
            - child_id (str)
    """
    request_data = dict(request.form)
    try:
        parent_id = request_data["user_id"]
        child_id = request_data["child_id"]
        clear_child_stats(parent_id, child_id)
        return jsonify({
            "cleared": True
        })
    except:
        raise InvalidUserInput("Invalid input")
