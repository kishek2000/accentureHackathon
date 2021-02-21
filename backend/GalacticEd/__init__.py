from flask import Flask
from dotenv import load_dotenv
from pathlib import Path 
from GalacticEd.utils.colourisation import printColoured
from flask_mongoengine import MongoEngine

import os

# Setting the environment variables:
env_path = Path('.') / '.env.{}'.format(os.getenv("GALACTIC_ED_DEV_MODE"))
load_dotenv(dotenv_path=env_path)

# Creating the Flask app instance
printColoured(" * Initialising Flask application")
app = Flask(__name__)

# Creating the database handler:
db = MongoEngine()

# ===== App Configuration =====

# Database connection parameters:
# app.config["MONGODB_SETTINGS"] = {
#     "db": "GalacticEd",
#     "host": "127.0.0.1",
#     "port": 27017,
#     # "username": "teamgalactic",
#     # "password": "1984"
# }

DB_URI = "mongodb+srv://teamgalactic:1984@galacticed-database.5gfph.mongodb.net/galacticed?retryWrites=true&w=majority"
app.config["MONGODB_HOST"] = DB_URI


# Database connection:
#     By default, Flask-MongoEngine assumes that the mongod instance is running on localhost on port 27017
db.init_app(app)

# The routes must be imported after the Flask application object is created. See https://flask.palletsprojects.com/en/1.1.x/patterns/packages/
import GalacticEd.routes
