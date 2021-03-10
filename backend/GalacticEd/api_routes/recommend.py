"""
Route handlers for recommending courses to children based on their 
performance statistics
"""

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
    get_stats,
    get_user,
    get_stats_in_range
)
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
        Given a list of stats objects, returns a tuple with the items:
            (avg time_taken, avg num_incorrect, avg difficult) 
    """
    averages = [0, 0, 0]
    for each_stat in stats:
        averages[0] += float(each_stat["time_taken"])
        averages[1] += float(each_stat["num_incorrect"])
        averages[2] += float(each_stat["difficulty"])
    for i, each_field in enumerate(averages, start=0):
        averages[i] = averages[i] / len(stats)
    return tuple(averages)        


@recommend_router.route("/next_lesson", methods=["GET"])
def profile_stats_push_handler():
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
        printColoured(" ➤ Recommending a lesson from '{}' for {}".format(category, child_id))
        
        curr_timestamp           = floor(time.time())
        week_prior_timestamp     = curr_timestamp - (1 * 7 * 24 * 60 * 60)   # TODO: this is a little dumb
        two_week_prior_timestamp = curr_timestamp - (2 * 7 * 24 * 60 * 60)   # TODO: this is a little dumb
        zero_reference           = 0

        all_stats       = get_stats_in_range(user_id, child_id, "shapes", zero_reference,           curr_timestamp) 
        last_week_stats = get_stats_in_range(user_id, child_id, "shapes", week_prior_timestamp,     curr_timestamp)
        this_week_stats = get_stats_in_range(user_id, child_id, "shapes", two_week_prior_timestamp, curr_timestamp)

        print_pretty_json(all_stats)
        # print_pretty_json(last_week_stats)
        # print_pretty_json(this_week_stats)

        # Getting the average time taken, num_incorrect, difficulty:
        printColoured("Performances: (avg time taken, avg num_incorrect, avg difficulty)", colour="blue")
        printColoured("-> Global", colour="blue")
        global_performance = stats_summarise(all_stats)
        print_pretty_json(global_performance)

        printColoured("-> Last Week", colour="blue")
        last_week_performance = stats_summarise(last_week_stats)
        print_pretty_json(last_week_performance)
        
        printColoured("-> This Week", colour="blue")
        this_week_performance = stats_summarise(this_week_stats)
        print_pretty_json(this_week_performance)


    except Exception as err:
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
