"""
This module contains route handlers for fetching info about courses.
"""

"""
    TODO
    Define an endpoint: GET /api/courses    
    Returns: 
        list of courses, eg. JSON containing fields:
            [
                {
                    "title": "Shapes",
                    "thumbnail": PATH_TO_PNG or URL,
                    "id": "1231fasdf235"
                },
                ...
            ]
"""

"""
    TODO
    Define an endpoint: GET /api/courses
    
    Parameters of the request:
        <COURSE_ID>
    
    Returns:
        details specific to one course, eg. JSON containing fields:
            {
                "title": "shapes",
                "image": PATH_TO_PNG or URL,
                "description": "Let's learn about the world of shapes!",
                "lessons": [
                    {
                        "id": "845894389asdbf"
                        "title": "The Square",
                        "points": 12,
                        "difficulty": 2,
                        "recommendedValue": 0.87,
                    },
                    ...
                ]
            }
"""
