from flask import Flask
from dotenv import load_dotenv
from pathlib import Path 
from GalacticEd.utils.colourisation import printColoured
import os

# Setting the environment variables:
env_path = Path('.') / '.env.{}'.format(os.getenv("GALACTIC_ED_DEV_MODE"))
load_dotenv(dotenv_path=env_path)

# Creating the Flask app instance
printColoured(" * Initialising Flask application")
app = Flask(__name__)

# The view module must be imported after the Flask application object is created. See https://flask.palletsprojects.com/en/1.1.x/patterns/packages/
import GalacticEd.views
