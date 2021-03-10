"""
A suite of database operations that abstract over the specific DBMS used and the driver
library or ODM used to interface with that DBMS.
"""
from GalacticEd import db
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.utils.debug import pretty
from GalacticEd.exceptions import InvalidUserInput
from typing import (
    Dict, 
    List,
    Callable
)
import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    """
        Given a document retrieved from the database, returns a JSON
        serialisable version.
            Eg.
                results = db.sample.find() 
                json_compatible_results = JSONEncoder().encode(results)
    """
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


def insert(collection_name: str, document: Dict) -> str:
    """ 
        Inserts and returns the ID of the newly inserted document in the target collection 

        Args:
            collection_name (str) 
            document (dict)

        Returns:
            str: ID of the newly inserted item
    """
    print(" ➤ Inserting: {}, in {}".format(document, collection_name))
    insertion_result = db[collection_name].insert_one(document)
    return str(insertion_result.inserted_id)

# ===== Courses Operations =====

def get_courses_lessons() -> List:
    """
        Retrieves all courses from the current database instance.   # TODO clarify the different between this and the function below

        Returns:
            list: all courses and their associated lesson details
    """
    courses = db.courses_lessons.find_one()
    courses["_id"] = str(courses["_id"])
    return courses

def get_courses_all() -> List:
    """
        Retrieves all courses from the current database instance.

        Returns:
            list: all courses and their associated lesson details
    """
    courses = [ course for course in db.courses_all.find() ]
    for each_course in courses:
        each_course["_id"] = str(each_course["_id"])
    return courses

def get_courses_full():
    """
        Retrieves all courses with MAXIMAL AMOUNT OF DETAIL
    """
    courses = [ course for course in db.courses_full.find() ]
    for each_course in courses:
        each_course["_id"] = str(each_course["_id"])
    return courses

# ===== Lessons Operations =====

def get_lesson(lesson_id: str) -> List:
    """
        Retrieves the lesson with the target lesson_id

        Args:
            lesson_id (str)
        
        Returns:
            dict: mapped from the 'lesson' json document
    """
    lesson = db.lessons.find_one({ "lessonId": lesson_id })
    lesson["_id"] = str(lesson["_id"])
    return lesson

def get_lesson_difficulty(course_id: str, lesson_id: str):
    all_course = get_courses_full()
    try: 
        target_course = [ course for course in all_course if course["courseId"] == course_id ][0] 
        target_lesson = [ lesson for lesson in target_course["lessons"] ]
        printColoured(" ➤ Found '{}' lesson '{}'".format(course_id, lesson_id))
        return target_lesson["difficulty"] if "difficulty" in target_lesson else 0.5
    except:
        raise InvalidUserInput(
            description="Failed to find course '{}', lesson '{}'".format(
                course_id, lesson_id
            )
        )

# ===== Children Management =====

def save_child(child, parent_user_id):
    """
        TODO
        multiple children with the same name unsupported
    """
    parent = get_user(user_id=parent_user_id)
    new_children = parent["children"].copy()
    child["_id"] = "{}-{}".format(parent_user_id, child["name"])
    child["statistics"] = []
    new_children.append(child)
    db.users.update_one({ "_id": ObjectId(parent_user_id) }, { "$set": { "children": new_children } })
    return (get_user(user_id=parent_user_id), child["_id"])

# ===== Statistics Operations =====

def get_stats(user_id: str):
    """
        TODO
    """
    stats = [ stat for stat in db.stats.find({ "user_id": user_id }) ]
    for each_stat in stats:
        each_stat["_id"] = str(each_stat["_id"])
    return stats

def clear_child_stats(parent_user_id: str, child_id: str):
    """
        TODO this is just a convenience function
    """
    try:
        db.users.update_one(
            {
                "_id": ObjectId(parent_user_id),
                "children": {
                    "$elemMatch": {
                        "_id": {
                            "$eq": child_id
                        }
                    }
                }
            },
            {
                "$set": {
                    "children.$.statistics": []
                }
            }
        )
    except:
        raise InvalidUserInput(description="Failed to clear")

def save_stats(stats, parent_user_id, child_id):
    """
        TODO
        pushes an object to db.users.children.statistics array
    """
    parent = get_user(user_id=parent_user_id)
    target_child = [ child for child in parent["children"] if child["_id"] == child_id ][0]
    # new_stats = target_child["statistics"].copy()
    # new_stats.append(stats)

    db.users.update_one(
        {
            "_id": ObjectId(parent_user_id),
            "children": {
                "$elemMatch": {
                    "_id": {
                        "$eq": child_id
                    }
                }
            }
        },
        {
            "$push": {
                "children.$.statistics": stats
            }
        }
    )
    printColoured(" ➤ Successfully saved new performance stats!")
    return stats

def get_stats_in_range(parent_user_id: str, child_id: str, course_id: str, start_timestamp: int, end_timestamp: int):
    """
        Given a parent user_id and child_id, finds that child and extracts their performance
        statistics 
    """
    parent = get_user(user_id=parent_user_id)
    target_child = [ child for child in parent["children"] if child["_id"] == child_id ][0]
    all_stats = [ 
        stat for stat in target_child["statistics"] 
        if (
            start_timestamp <= int(stat["time_on_completion"]) <= end_timestamp
        ) and (
            stat["course_id"] == course_id
        )
    ] 
    return all_stats

# ===== User Operations =====

def get_all_users() -> List[Dict]:
    """
        Fetches all users from the database

        Returns:
            list: all users in the 'users' collection of the database instance
    """
    return [ user for user in db.users.find() ]

def save_user(user) -> str:
    """ 
        Saves and returns the ID of the new user 

        Returns:
            str: ID of the new user
    """
    printColoured(" ➤ Saving new user: {}".format(user), colour="blue")
    # Builtin function vars() takes an object and constructs a dict. The _id key is then
    # removed to prevent colliding with MongoDB's generated ID
    document = vars(user)
    del document["_id"]
    return insert("users", document)

def wipe_all_users():
    """ Wipes all documents from the GalacticEd 'users' collection """
    db.users.drop()
    printColoured(" ➤ DROPPED USERS", colour="red")

def get_user(user_id: str) -> Dict: 
    """ 
        Fetches the user with the given ID (the one that's assigned by MongoDB
        under the hood)

        Args:
            user_id (str)
        
        Returns:
            dict: of shape: { _id, name, email, password }
    """
    target_user = db.users.find_one({"_id": ObjectId(user_id)})
    target_user["_id"] = str(target_user["_id"])
    return target_user

def get_user_by_email(email):
    """
        Fetches the user by email rather than user_id

        Args:
            email (str)

        Returns:
            dict: of shape: { _id, name, email, password }
    """
    target_user = db.users.find_one({"email": email})
    if target_user == None:
        return None
    details = {
        "_id": str(target_user["_id"]),
        "name": target_user["name"],
        "email": target_user["email"],
        "password": target_user["password"],
        "children": target_user["children"]
    }
    return details

def password_verified(email, password):
    """
        Given an email and password, verifies it against the
        hashed password stored in the database 
    """
    user = get_user_by_email(email)
    if user == None:
        return False
    # TODO: need to hash passwords
    return user["password"] == password

def email_taken(email):
    return db.users.find_one({ "email": email })


def wipe_user(email):
    """
        TODO unprotected! This is just a convenience function
    """
    printColoured(" ➤ Removing a user: {}".format(email), colour="yellow")
    db.users.remove({"email": email})
