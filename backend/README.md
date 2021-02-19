Directory structure:

```
/backend
    setup.py               # Script for starting the server
    /galactic-ed
        __init__.py        # Where the Flask object is instantiated
        views.py           # Contains the routes
        /static
            style.css
        /templates
            layout.html
            index.html
            login.html
            ...
```

The `Flask` object must be created in `__init__.py`. Doing this ensures each module can import it safely.

### Setup Instructions:

```
# Setting environment variables
export FLASK_APP=galactic-ed
export GALACTIC_ED_DEV_MODE=true

# Enables Flask's debug features such as live reloading when starting the server with Flask run
export FLASK_ENV=development

# Installing dependencies
pip install -e .

# Starting the server:
flask run
# Or run:
python3 start.py
```

-   Put `export FLASK_APP=galactic-ed` and `export GALACTIC_ED_DEV_MODE=true` in `~/.bashrc` to avoid having to set these environment variables each time
-   Follow <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/">instructions here</a> to set up MongoDB locally
    -   Create a new role with username `teamgalactic` and password `1984`
    -   Create a database instance called `GalacticEd` under the `teamgalactic` role

### Structuring a Large Flask Application:

-   <a href="https://flask.palletsprojects.com/en/1.1.x/patterns/packages/">Official Flask guide</a>
