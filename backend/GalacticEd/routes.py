from GalacticEd import app
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.api_routes import (
    test_router,
    auth_router,
    courses_router,
    lessons_router,
    profile_router,
    recommend_router
)

# Registering route handler blueprints
app.register_blueprint(test_router, url_prefix="/api/test")
app.register_blueprint(auth_router, url_prefix="/api/auth")
app.register_blueprint(courses_router, url_prefix="/api/courses")
app.register_blueprint(lessons_router, url_prefix="/api/lessons")
app.register_blueprint(profile_router, url_prefix="/api/profile")
app.register_blueprint(recommend_router, url_prefix="/api/recommend")
