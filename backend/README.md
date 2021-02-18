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
export FLASK_APP=galactic-ed
pip install -e .
flask run
```

### Structuring a Large Flask Application:

-   <a href="https://flask.palletsprojects.com/en/1.1.x/patterns/packages/">Official Flask guide</a>
