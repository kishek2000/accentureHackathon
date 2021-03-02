"""
A suite of database operations that abstract over the specific DBMS used and the driver
library or ODM used to interface with that DBMS.
"""
from GalacticEd import db
from GalacticEd.utils.colourisation import printColoured
from typing import (
    Dict, 
    List
)

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

def get_all_courses() -> List:
    """
        Retrieves all courses from the current database instance.

        Returns:
            list: all courses and their associated lesson details
    """
    return [ course for course in db.courses.find() ]

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
    # lesson_details = {
    #     "_id": str(lesson[""]),
    #     "course": ,
    #     "lesson": ,
    #     "prompt": ,
    #     "questions": 
    # }

    return lesson

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
    target_user = db.users.find_one({"_id": user_id})
    details = {
        "_id": str(target_user["_id"]),
        "name": target_user["name"],
        "email": target_user["email"],
        "password": target_user["password"]
    }
    return details

def get_user(email):
    """
        Fetches the user by email rather than user_id

        Args:
            email (str)

        Returns:
            dict: of shape: { _id, name, email, password }
    """
    target_user = db.users.find_one({"email": email})
    details = {
        "_id": str(target_user["_id"]),
        "name": target_user["name"],
        "email": target_user["email"],
        "password": target_user["password"]
    }
    return details

def password_verified(email, password):
    """
        Given an email and password, verifies it against the
        hashed password stored in the database 
    """
    user = get_user(email)
    # TODO: need to hash passwords
    return user["password"] == password
