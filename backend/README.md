-   Put `export FLASK_APP=galactic-ed` and `export GALACTIC_ED_DEV_MODE=true` in `~/.bashrc` to avoid having to set these environment variables each time
-   Follow <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/">instructions here</a> to set up MongoDB locally
    -   Create a database instance called `GalacticEd`

### Backend Directory Structure:

```
/backend
    setup.py               # Script for starting the server
    /galactic-ed
        __init__.py        # Where the Flask object is instantiated
        routes.py          # Contains the routes
        database_ops.py    # Contains database interfacing functions
        /api_routes        # Package containing route handler blueprints
            ...
        /models            # Package containing schemas for MongoDB documents
            ...
        /static
            /images
            ...
        /templates
            ...
        /utils             # Package containing utility scripts and global helpers
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

# Alternatively, run
sh run.sh
```

### Structuring a Large Flask Application:

-   <a href="https://flask.palletsprojects.com/en/1.1.x/patterns/packages/">Official Flask guide</a>
