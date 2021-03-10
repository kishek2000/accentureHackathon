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
    get_user
)
from GalacticEd.utils.debug import pretty

recommend_router = Blueprint("recommend", __name__)


@recommend_router.route("/next_lesson", methods=["GET"])
def profile_stats_push_handler():
    """
        Params:
            - child_id (str)
            - category (str)
    """
    child_id = request.args.get("child_id")
    printColoured(" ➤ Recommending a lesson to child {}".format(child_id))
    
    try:
        pass
    except:
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
