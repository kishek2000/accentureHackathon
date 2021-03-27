def title_case(string):
    return string[0].upper() + string[1:]

def get_question_obj(question=None, title=None, no_hue=False, hue=0):
    question_obj = {
        "src": question, 
        "title": title, 
    }
    if not no_hue:
        question_obj["hue"] = hue
    return question_obj

def generate_identify_questions(lesson=None, artifact_type=None, artifact_options=None, correct_artifact=None, comment_title = "Nice!", subtitle = "This is a"):
    question = {
        f"{artifact_type}": artifact_options, 
        "correct": {
            f"{artifact_type[:len(artifact_type)-1]}": correct_artifact, 
            "commentTitle": comment_title, 
            "subTitle": subtitle
        }, 
        
    }
    return question