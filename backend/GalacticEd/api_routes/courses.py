"""
This module contains route handlers for fetching info about courses.
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
    get_courses_full,
    JSONEncoder
)

courses_router = Blueprint("courses", __name__)

@courses_router.route("/lessons", methods=["GET", "POST"])
def courses_handler():
    """
        Fetches all the available courses and details on what lesson levels
        they contain.

        Returns:
            all_courses: 
                json object containing { courses } where courses a json array 
                containing objects of shape { title, thumbnail, id }

        Sample return value:
            {
                courses: [
                    {
                        title: "Shapes",
                        thumbnail: "shapesThumbnail.png",
                        id: "shapes01",
                    },
                    ...
                ],
            }
    """
    courses = get_courses_lessons()
    return jsonify(courses)

@courses_router.route("/all", methods=["GET"])
def courses_all_handler():
    """
        Fetches all the available courses and details on what lesson levels
        they contain.

        Returns:
            all_courses: 
                json array with the shape: 
                    [ { title, image, description, lessons }, ... ]
                where 'lessons' is a json array with shape: 
                    [ { _id, level, title, description } ]

        Sample return value:
            [
                {
                    "title": "shapes",
                    "image": "/shapesHeader.png",
                    "description": "Let's learn about the world of shapes!",
                    "lessons": [
                        {
                            "id": "level-1",
                            "level": "1",
                            "title": "Identifying Shapes",
                            "description": "Learn what shapes are called!"
                        },
                        ...
                    ]
                },
                ...
            ]
    """
    courses = get_courses_all()
    return jsonify(courses)

@courses_router.route("/full", methods=["GET"])
def courses_full_handler():
    """
        TODO: proper documentation here
        Fetches all the available courses and FULL details on what lesson levels 
    """
    courses = get_courses_full()
    return jsonify(courses)

"""
    TODO
    Define an endpoint: GET /api/courses
    
    Parameters of the request:
        <COURSE_ID>
    
    Returns:
        details specific to one course, eg. JSON containing fields:
            {
                "title": "shapes",
                "image": PATH_TO_PNG or URL,
                "description": "Let's learn about the world of shapes!",
                "lessons": [
                    {
                        "id": "845894389asdbf"
                        "title": "The Square",
                        "points": 12,
                        "difficulty": 2,
                        "recommendedValue": 0.87,
                    },
                    ...
                ]
            }
"""
