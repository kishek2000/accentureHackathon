"""
This is the root package where:
- Flask app instance is created and configured
- The database connection is established and the handler is instantiated
- The environment variables are loaded from either .env.development or .env.production
  in the same directory
"""
from flask import Flask
from dotenv import load_dotenv
from pathlib import Path 
from GalacticEd.utils.colourisation import printColoured
from flask_pymongo import PyMongo
from GalacticEd.exceptions import error_handler
from oauthlib.oauth2 import WebApplicationClient
import pymongo
import os

# Setting the environment variables:
# env_path = Path('.') / '.env.{}'.format(os.getenv("GALACTIC_ED_DEV_MODE"))
env_path = Path('.') / '.env.{}'.format("development")
load_dotenv(dotenv_path=env_path)
printColoured("Loaded the context of {} into the environment:".format(env_path))

# Creating the Flask app instance
printColoured(" * Initialising Flask application")
app = Flask(__name__)

# ===== App Configuration =====

app.secret_key = os.getenv("SECRET_KEY") or os.urandom(24)

# OAuth 2 client initialisation
GOOGLE_API_CLIENT_ID = os.getenv("GOOGLE_API_CLIENT_ID")
GOOGLE_API_CLIENT_SECRET = os.getenv("GOOGLE_API_CLIENT_SECRET")
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
google_client = WebApplicationClient(GOOGLE_API_CLIENT_ID)

# Registering the default error handler
app.register_error_handler(Exception, error_handler)

# Database connection parameters:
client = pymongo.MongoClient("mongodb+srv://teamgalactic:1984@galacticed-database.5gfph.mongodb.net/galacticed?retryWrites=true&w=majority")

# Creating the database handler:
db = client["galacticed"]

# The routes must be imported after the Flask application object is created. See https://flask.palletsprojects.com/en/1.1.x/patterns/packages/
import GalacticEd.routes
