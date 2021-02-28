from GalacticEd import app
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.api_routes import (
    test_router,
    auth_router
)

# Registering route handler blueprints
app.register_blueprint(test_router, url_prefix="/api/test")
app.register_blueprint(auth_router, url_prefix="/api/auth")
