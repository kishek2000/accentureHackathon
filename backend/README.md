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
# Installing dependencies
pip install -e .
pip install -r requirements.txt

# Starting the server:
# Run (Mac, Linux): (will export the environment variables for you)
sh run.sh
# If on windows, you will need be in powershell to use run.sh
```

### Structuring a Large Flask Application:

-   <a href="https://flask.palletsprojects.com/en/1.1.x/patterns/packages/">Official Flask guide</a>
