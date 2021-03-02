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
import os
from GalacticEd.models import User
from GalacticEd.exceptions import InvalidUserInput
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.database_ops import (
    get_all_courses
)

courses_router = Blueprint("courses", __name__)

@course_router.route("/courses", methods=["GET", "POST"])
def courses_handler():
    """
        Fetches all the available courses and details on what lesson levels
        they contain.

        Returns:
            all_courses: 
                json array with the shape: 
                    [ { courseId, lessons }, ... ]
                where 'lessons' is a json array with shape: 
                    [ { courseId, lessonId, lessonTitle, lessonHelp, lessonType, prompt, questions } ]
                where 'questions' is a json array with shape (for the 'shapes' course):
                    [ { shapes, correct } ]      

        Sample return value:
            [
                {
                    courseId: "shapes",
                    lessons: [
                        {
                            courseId: "shapes",
                            lessonId: "level-1",
                            lessonTitle: "What's that Shape?",
                            lessonHelp: "none",
                            lessonType: "identify",
                            prompt: "Tap on the shape to discover what it is!",
                            questions: [
                                {
                                    shapes: [{ shape: "square", colour: 0 }],
                                    correct: {
                                        shape: { shape: "square", colour: 0 },
                                        commentTitle: "Nice!",
                                        subTitle: "This is a",
                                    },
                                },
                                {
                                    shapes: [{ shape: "circle", colour: 0 }],
                                    correct: {
                                        shape: { shape: "circle", colour: 0 },
                                        commentTitle: "Nice!",
                                        subTitle: "This is a",
                                    },
                                },
                                {
                                    shapes: [{ shape: "square", colour: 0 }],
                                    correct: {
                                        shape: { shape: "square", colour: 0 },
                                        commentTitle: "Nice!",
                                        subTitle: "This is a",
                                    },
                                },
                            ],
                        },
                        ...
                    ]
                }
            ];
    """
    return jsonify(get_all_courses())


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
