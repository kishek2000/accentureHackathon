"""
Route handlers for fetching profile data and learning statistics about a 
particular user
"""
import re
from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    jsonify
)
from GalacticEd.models import User, LearningProfile
from GalacticEd.exceptions import InvalidUserInput
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.database_ops import (
    get_courses_lessons,
    get_courses_all,
    get_stats,
    get_all_lessons,
    get_user,
    save_stats,
    get_lesson_difficulty,
    get_child_proficiency,
    clear_child_stats,
    set_child_proficiency,
    set_rec_params,
    get_rec_params
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
    child_id = request.args.get("child_id")
    printColoured(" ➤ Getting child stats: {}".format(user_id))
    stats = get_stats(user_id, child_id)
    return jsonify(stats)


# TODO: Would be a cool idea to have the frontend display the last X stats for each category

@profile_router.route("/stats", methods=["POST"])
def profile_stats_push_handler():
    """
        Params:
            - user_id  (str)
            - child_id (str)
            - course_id (str)
            - lesson_id (str)
            - date (integer timestamp in seconds)
            - num_incorrect (int)
            - time_taken (float or int)
    """
    request_data = dict(request.form)
    printColoured(" ➤ A child has just completed a lesson! Received some stats to commit:")
    pretty(request_data)

    try:
        course_id = request_data["course_id"]
        lesson_id = request_data["lesson_id"]
        user_id = request_data["user_id"]
        child_id = request_data["child_id"]
        difficulty = get_lesson_difficulty(
            course_id, 
            lesson_id
        )
        curr_rating = get_child_proficiency(user_id, child_id, course_id)
        printColoured(" !!!!!!!!! Proficiency now: ")
        rec_params = get_rec_params(user_id, child_id)
        profile = LearningProfile(**rec_params)
        new_proficiency = profile.getNewRating( #(uRating: float, qRating: float, expTime: float, actTime: float, nQuestions: int, nIncorrect: int)
            curr_rating,
            difficulty,
            30, # todo expected time of lesson
            float(request_data["time_taken"]),
            10, # todo actual number of questions in lesson
            int(request_data["num_incorrect"])
        )
        set_child_proficiency(user_id, child_id, course_id, new_proficiency)
        return jsonify(save_stats({
            "course_id": course_id,
            "lesson_id": lesson_id,
            "num_incorrect": request_data["num_incorrect"],
            "time_taken": request_data["time_taken"],
            "date": request_data["date"],
            "difficulty": difficulty,
            "proficiency": new_proficiency
        }, user_id, child_id))
    except InvalidUserInput as err:
        print(err)
        raise InvalidUserInput(description=err.get_description())
    # except Exception as err:
    #     print(err)
    #     raise InvalidUserInput(description="Invalid or missing stats fields: {}".format(err))

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

@profile_router.route("/set_params", methods=["PUT"])
def profile_set_recommender_params():
    """
        TODO
        This is for the user to manually set the values for the parameters being used
        as part of the recommendation engine
        Params:
            - user_id: str, 
            - child_id: str, 
            - increase_scalar: float, 
            - decrease_scalar: float, 
            - sensitivity: float,
            - expected_time_scalar: float,
            - time_sensitivity: float,
    """
    request_data = dict(request.form)
    try:
        return jsonify(set_rec_params(
            request_data["user_id"],
            request_data["child_id"],
            float(request_data["increase_scalar"]),
            float(request_data["decrease_scalar"]),
            float(request_data["sensitivity"]),
            float(request_data["expected_time_scalar"]),
            float(request_data["time_sensitivity"])
        ))
    except Exception as err: 
        raise InvalidUserInput("Invalid inputs: {}".format(err))    
    
@profile_router.route("/progress")
def progress_until_next_level():
    """
        TODO
        This gives a measure of progress until the next level for a particular child 
        in a specific category
    """
    user_id = request.args.get("user_id")
    child_id = request.args.get("child_id")
    course_id = request.args.get("course_id")

    # Get all lessons in the category
    lessons = get_all_lessons(course_id)

    # Find the lesson with the minimal absolute difference with target_difficulty 
    child_proficiency = get_child_proficiency(user_id, child_id, course_id)
    lower_bound_difficulty = 0
    upper_bound_difficulty = 0
    lesson_difficulties = [ 
        (lesson["lessonId"], get_lesson_difficulty(course_id, lesson["lessonId"])) 
        for lesson in lessons 
    ]

    next_lesson = ""
    for lesson_diff in lesson_difficulties:
        if child_proficiency > lesson_diff[1]:
            lower_bound_difficulty = lesson_diff[1]
        else:
            upper_bound_difficulty = lesson_diff[1]
            next_lesson = lesson_diff[0]
            break
    
    progress = 0
    threshold = (upper_bound_difficulty - lower_bound_difficulty) / 2
    if upper_bound_difficulty == 0:
        upper_bound_difficulty = 3000
        progress = 1
    else:
        progress = (child_proficiency - lower_bound_difficulty) / float(threshold)
    return jsonify({
        "child_proficiency": child_proficiency,
        "lower_bound": lower_bound_difficulty,
        "upper_bound": upper_bound_difficulty,
        "threshold": threshold,
        "next_lesson": next_lesson,
        "progress": progress
    })

"""
    Next goals:

    - Tuning the rec engine parameters (on a per child, per category basis)
        - eg. Slower or faster ELO change depending on learning speed
        - eg. More forgiving standard for lesson progression
        - eg. Adjust effect of time taken/expected time taken changing
    - Initial diagnostic test for newly registered children [Optional?]
    - Configurable theming (removing dinosaurs, longer interval for those
    congratulations screens? etc.)
    - Rendering more stats
        - "You are X% "
    - Uploading new lessons
    - Badges/achievements
"""
