from GalacticEd import db
from GalacticEd.utils.colourisation import printColoured

def insert(collection_name, document):
    # TODO: implement
    print("Inserting {} in {}".format(document, collection_name))

def get_all_users():
    return [ user for user in db.users.find() ]

def save_user(user):
    """ Saves and returns the ID of the new user """
    printColoured("Saving: {}".format(user), colour="blue")
    insertion_result = db.users.insert_one(user)
    printColoured("Successfully inserted with ID: {}".format(insertion_result))
    printColoured("{}".format(insertion_result.inserted_id))
    return str(insertion_result.inserted_id)

def wipe_all_users():
    """ Wipes all documents from the GalacticEd 'users' collection """
    db.users.drop()
    printColoured("DROPPED USERS", colour="red")
