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

@lessons_router.route("/", methods=["GET"])
def get_lessons():
    """
        Fetches a course with a specific name/ID

        Query parameters:
            course_id
            lesson_id

        Returns:
            all_courses: 
                json object with the shape: 
                    { lessonId, course, level, lesson, prompt, questions }
                where 'questions' is a json array with shape (for the 'shapes' course):
                    [ { shapes, correct } ]      
    """
    lesson_id = request.args.get("lesson_id")
    course_id = request.args.get("course_id")
    return jsonify(get_lesson(course_id, lesson_id))
