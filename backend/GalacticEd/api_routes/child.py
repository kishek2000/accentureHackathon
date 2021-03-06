"""
This module contains route handlers registering a child and fetching profile data for
a user's registered children. 
"""
from flask import (
    Blueprint,
    request,
    jsonify
)
from GalacticEd.models import User
from GalacticEd.exceptions import InvalidUserInput
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.database_ops import (

)

child_router = Blueprint("child", __name__)


@child_router.route("/", methods=["GET"])
def courses_all_handler():
    """
        TODO: documentation
    """
    courses = get_courses_all()
    return jsonify(courses)
