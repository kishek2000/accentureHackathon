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

def get_target_difficulty():
    """

    """
"""
  My idea for this simple recommender interface:
        For each category, the frontend queries `/api/recommend/next_course` 
        passing in:    child_id, category
        and gets back: lesson ID of the next recommended lesson in that category
    
    Internally, the logic could go like this:

        1. Look up the child associated with child_id
        2. Get their stats object list (which contains historical performance data)
        3. Look up the stats object for the specified category
             -> Now we have access to performance data which has the structure:
                    [
                        {
                            lesson_id,
                            num_incorrect,      ('incorrectness_measure')
                            time_taken,
                            difficulty,
                            time_on_completion (timestamp),
                            completed (bool),
                            parental_engagement_rating (int in a range, eg. 1-10?) 
                        },
                        ... and more
                    ]
        4. The hard part:
            a)
                Transform all data into inputs into a rec engine
                
                -> Examples of inputs we can obtain/calculate:
                    1. proficiency (weighted average? Recent progress is more heavily weighted)
                        -> Function of: num_incorrect, time_taken, difficulty
    [ON HOLD]       2. attention_span (weighted average? Recent progress is more heavily weighted)
                        -> Function of: time_taken, completed
                    3. proficiency_delta
                        ->  Difference in average proficiency last week and this week (for example)
                            Why do this: 
                                1. This serves as a 'rating' score so the rec engine can assess
                                   the effectiveness of our previous recommendations
                                2. Collaborative filtering?
                                    We can recommend lessons to children based on how effectively
                                    they helped other children increase in proficiency
            b) 
                [RECOMMENDATION STEP HERE]

                output: 0.53    (ranges from 0.00-1.00 for instance, or integers 1-10?)

            c) 
                Get back a difficulty rating (in either float/int)
                [What else could we return from the rec engine?]
        5. Based on what recommended difficulty value the rec engine outputted, find the lesson
           that best matches that difficulty value. 

Next things to do:
0. Set up steps 1-3 above
1. Figure out how to calc proficiency value
2. Mapping profiency to a value within the difficulty range
3. Fetch lesson with that difficulty

Note: difficulty will be manually assigned

- Generate mockup data for supervised learning model

"""

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
        printColoured(err.stacktrace, color="red")
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
