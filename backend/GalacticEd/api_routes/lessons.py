"""
Route handlers for fetching lesson details (and pushing user performance on a particular
lesson to the database)
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
    get_lesson
)

lessons_router = Blueprint("lessons", __name__)

@lessons_router.route("/lessons", methods=["GET"])
def get_lesson():
    """
        Fetches a course with a specific name/ID

        Query parameters:
            lesson_id
            lesson_level

        Returns:
            all_courses: 
                json object with the shape: 
                    { lessonId, course, level, lesson, prompt, questions }
                where 'questions' is a json array with shape (for the 'shapes' course):
                    [ { shapes, correct } ]      

        # TODO: IMPORTANT. I changed some of the fields. Review with Adi
        Sample return value:
            {
                "lessonId": "shapes-level-1",
                "level"
                "course": "shapes",
                "lesson": "What's that Shape?",
                "prompt": "Select the square in each question to pass!",
                "questions": [
                    {
                        "shapes": [{ "shape": "square", "colour": 0 }],
                        "correct": "square",
                    },
                    ...
                ]
            }
    """
    return jsonify(get_lesson())


"""
    TODO
    Define an endpoint: POST /api/lessons/<LESSON_TYPE>/<LESSON_LEVEL>

    This endpoint takes in the child's performance as measured by the frontend and 
    saves it to the database.

    TODO What are the parameters we should be saving?
"""
