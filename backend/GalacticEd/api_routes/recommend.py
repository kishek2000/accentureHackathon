"""
Route handlers for recommending courses to children based on their 
performance statistics
"""
import sys
from flask import (
    Blueprint,
    request,
    redirect,
    jsonify
)
from GalacticEd.exceptions import InvalidUserInput
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.database_ops import (
    get_courses_lessons,
    get_courses_all,
    get_child_proficiency,
    get_stats,
    get_user,
    get_stats_in_range,
    get_all_lessons,
    get_lesson_difficulty
)
from GalacticEd.proficiency import getNewRating
from GalacticEd.utils.debug import pretty, print_pretty_json

import time
from math import floor
from datetime import datetime
from typing import (
    List
)
from functools import reduce

recommend_router = Blueprint("recommend", __name__)

# TODO: temporary aggregator stub


def stats_summarise(stats: List):
    """
        Given a list of stats objects, returns a dict with the items:
            (avg time_taken, avg num_incorrect, avg difficulty) 
    """
    averages = [0, 0, 0]
    for each_stat in stats:
        averages[0] += float(each_stat["time_taken"])
        averages[1] += float(each_stat["num_incorrect"])
        averages[2] += float(each_stat["difficulty"])
    for i, _ in enumerate(averages, start=0):
        averages[i] = averages[i] / len(stats)

    return {
        "avg_time_taken": averages[0],
        "avg_num_incorrect": averages[1],
        "avg_difficulty": averages[2]
    }

def calc_proficiency(time_taken, num_incorrect, difficulty):
    """
        Based on: 
            - time_taken 
            - num_incorrect 
            - difficulty
            - past results? Eg. the difference between avg. proficiency this week and avg. proficiency last week
        Return some measure of proficiency (that could be used to recommend 
        the target difficulty of the next lesson)
    """

def get_lesson_of_difficulty(target_difficult: int, course_id: str):
    """
        Gets the ID of the lesson 
    """
    # Get all lessons in the category
    lessons = get_all_lessons(course_id)

    # Find the lesson with the minimal absolute difference with target_difficulty 
    target_lesson_id = ""
    minimal_diff = sys.maxsize
    target_lesson_diff = 0
    for each_lesson in lessons:
        lesson_difficulty = get_lesson_difficulty(course_id, each_lesson["lessonId"])
        print("Target diff: {}, curr diff: {}".format(target_difficult, lesson_difficulty))
        if abs(lesson_difficulty - target_difficult) < minimal_diff:
            minimal_diff = abs(lesson_difficulty - target_difficult) 
            print("Best diff so far: {}".format(minimal_diff))
            target_lesson_id = each_lesson["lessonId"]
            target_lesson_diff = lesson_difficulty
    return (target_lesson_id, target_lesson_diff)

@recommend_router.route("/next_lesson", methods=["GET"])
def recommend_next_lesson_handler():
    """
        TODO: documentation:
        Params:
            - user_id
            - child_id
            - course_id
    """
    # Get the user's current rating and fetch the lesson which matches
    # that rating the closest.
    user_id = request.args.get("user_id")
    child_id = request.args.get("child_id")
    course_id = request.args.get("course_id")
    child_proficiency = get_child_proficiency(user_id, child_id, course_id)
    target_lesson = get_lesson_of_difficulty(child_proficiency, course_id)
    return target_lesson[0]

# TODO: this route should be in profile/stats
@recommend_router.route("/STATS_STUB")
def get_stats_breakdown_handler():
    """
        TODO: documentation
        Params:
            - user_id (str)
            - child_id (str)
            - course_id (str)
    """
    try:
        user_id = request.args.get("user_id")
        child_id = request.args.get("child_id")
        category = request.args.get("category")
        printColoured(
            " ➤ Recommending a lesson from '{}' for {}".format(category, child_id))

        curr_timestamp = floor(time.time())
        week_prior_timestamp = curr_timestamp - \
            (1 * 7 * 24 * 60 * 60)   # TODO: this is a little dumb
        two_week_prior_timestamp = curr_timestamp - \
            (2 * 7 * 24 * 60 * 60)   # TODO: this is a little dumb
        zero_reference = 0

        all_stats = get_stats_in_range(
            user_id, child_id, "shapes", zero_reference,           curr_timestamp)
        last_week_stats = get_stats_in_range(
            user_id, child_id, "shapes", two_week_prior_timestamp, week_prior_timestamp)
        this_week_stats = get_stats_in_range(
            user_id, child_id, "shapes", week_prior_timestamp,     curr_timestamp)

        print_pretty_json(all_stats)
        # print_pretty_json(last_week_stats)
        # print_pretty_json(this_week_stats)

        # Getting the average time taken, num_incorrect, difficulty:
        printColoured(
            "Performances: (avg time taken, avg num_incorrect, avg difficulty)", colour="blue")
        printColoured(" → Global", colour="blue")
        global_performance = stats_summarise(all_stats)
        pretty(global_performance)

        printColoured(" → Last Week", colour="blue")
        last_week_performance = stats_summarise(last_week_stats)
        pretty(last_week_performance)

        printColoured(" → This Week", colour="blue")
        this_week_performance = stats_summarise(this_week_stats)
        pretty(this_week_performance)

    except Exception as err:
        # printColoured(err.stacktrace, color="red")
        printColoured(err, colour="red")
        raise InvalidUserInput(description="Invalid or missing stats fields")

    return jsonify({
        "lesson-id": "shapes-4"
    })


# TODO:
# Prescribing recommended time [ON HOLD]
#    -> Recommended frequency per category, per week
#    -> 1 week recommendation interval
"""


"""

# Prioritising modules
"""
    Simple idea: rank modules based on increasing order of proficiency_delta (for each category)

"""
