from GalacticEd import app
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.models import User
from flask import redirect, url_for

@app.route("/")
def index():
    return "Hello World"

@app.route("/db")
def db():
    users = [ user.name for user in User.objects ]
    print(users)
    return """
        Database contents:\n
            {}
    """.format(", ".join(users))

@app.route("/db/makeuser")
def db_make_user():
    printColoured("Inserted a new sample user")
    new_user = User(name="Jeremy")
    new_user.save()
    return redirect(url_for("db"))
