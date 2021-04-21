import ast
import sys
import json

from itertools import combinations
from prettyprinter import cpprint
from constants import shapes, colours
from generators.generate_lesson import generate_lesson_obj
from generators.generate_question import get_question_obj, generate_identify_questions, title_case

def permute_questions():
    combos = list(combinations(shapes, 2))
    final = [
        {
            "correct": get_question_obj(
                question=shapes[0],
                title=title_case(shapes[0])
            ),
            "shapes": [
                get_question_obj(
                    question=shape,
                    title=title_case(shape)
                ) for shape in combo
            ]
        }
        for combo in combos
    ]
    return final

current_shapes_lessons = open("lesson-jsons/shapes.json", "r")
current_shapes_lessons_array = ast.literal_eval(current_shapes_lessons.read())

new_shape_lesson = generate_lesson_obj(
    course_id="shapes",
    lesson_id="level-1",
    lesson_title="What's that Shape?",
    question_title="Select the ",
    lesson_type="identify",
    prompt="Tap on the shape to discover what it is!"
)

shapes_options = [
        get_question_obj(
            question=shape,
            title=title_case(shape[0])
        ) for shape in shapes[:3]
    ]

new_shape_lesson["questions"] = generate_identify_questions(
    lesson=new_shape_lesson,
    artifact_type="shapes",
    artifact_options=shapes_options,
    correct_artifact=get_question_obj(
        question=shapes[0],
        title=title_case(shapes[0])
    )
)

current_shapes_lessons_array.append(new_shape_lesson)
# cpprint(current_shapes_lessons_array)
# permute_questions()
shapes_lessons = open("lesson-jsons/shapes.json", "w")
original_stdout = sys.stdout
sys.stdout = shapes_lessons
print(json.dumps(current_shapes_lessons_array, indent=2))
sys.stdout = original_stdout
# shapes_lessons.write(json.loads(parsed_lessons, indent=2))