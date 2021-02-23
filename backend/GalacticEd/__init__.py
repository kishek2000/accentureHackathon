from flask import Flask
from dotenv import load_dotenv
from pathlib import Path 
from GalacticEd.utils.colourisation import printColoured
from flask_pymongo import PyMongo
from GalacticEd.exceptions import error_handler
import pymongo
import os

# Setting the environment variables:
env_path = Path('.') / '.env.{}'.format(os.getenv("GALACTIC_ED_DEV_MODE"))
load_dotenv(dotenv_path=env_path)

# Creating the Flask app instance
printColoured(" * Initialising Flask application")
app = Flask(__name__)

# ===== App Configuration =====

# TODO: move the secret string to .env.* files
app.secret_key = "senpai"

# Registering the default error handler
app.register_error_handler(Exception, error_handler)

# Database connection parameters:
client = pymongo.MongoClient("mongodb+srv://teamgalactic:1984@galacticed-database.5gfph.mongodb.net/galacticed?retryWrites=true&w=majority")

# Creating the database handler:
db = client["galacticed"]

# The routes must be imported after the Flask application object is created. See https://flask.palletsprojects.com/en/1.1.x/patterns/packages/
import GalacticEd.routes
