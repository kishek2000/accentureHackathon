"""
A suite of database operations that abstract over the specific DBMS used and the driver
library or ODM used to interface with that DBMS.
"""
from GalacticEd import db
from GalacticEd.utils.colourisation import printColoured

def insert(collection_name, document):
    """ Inserts and returns the ID of the newly inserted document """
    print(" ➤ Inserting: {}, in {}".format(document, collection_name))
    insertion_result = db[collection_name].insert_one(document)
    return str(insertion_result.inserted_id)

def get_all_users():
    return [ user for user in db.users.find() ]

def save_user(user):
    """ Saves and returns the ID of the new user """
    printColoured(" ➤ Saving new user: {}".format(user), colour="blue")
    # Builtin function vars() takes an object and constructs a dict. The _id key is then
    # removed to prevent colliding with MongoDB's generated ID
    document = vars(user)
    del document["_id"]
    return insert("users", document)

def wipe_all_users():
    """ Wipes all documents from the GalacticEd 'users' collection """
    db.users.drop()
    printColoured("DROPPED USERS", colour="red")

def get_user(user_id):
    """ 
        Fetches the user with the given ID and returns a dictionary of keys:
        { user_id, name, email }
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
