from flask import Flask

app = Flask(__name__)

# The view module must be imported after the Flask application object is created. See https://flask.palletsprojects.com/en/1.1.x/patterns/packages/
import GalacticEd.views
