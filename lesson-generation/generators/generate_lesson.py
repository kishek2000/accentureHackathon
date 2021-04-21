def generate_lesson_obj(course_id=None, lesson_id=None, lesson_title=None, question_title=None, lesson_type=None, prompt=None):
    lesson = {
        "courseId": course_id, 
        "lessonId": lesson_id, 
        "lessonTitle": lesson_title, 
        "lessonType": lesson_type, 
        "prompt": prompt, 
        "questions": []
    }
    if question_title:
        lesson["questionTitle"] = question_title
    return lesson
