#!/bin/bash
export GALACTIC_ED_DEV_MODE=true
export FLASK_APP=GalacticEd
# Enables Flask's debug features such as live reloading when starting the server with Flask run
export FLASK_ENV=development
flask run