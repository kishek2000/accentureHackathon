"""
A utility script for starting the API server.
"""
from GalacticEd import app
from GalacticEd import db

if __name__ == "__main__":
    app.run(debug=True, ssl_context="adhoc")
