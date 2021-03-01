"""
Route handlers for fetching lesson details (and pushing user performance on a particular
lesson to the database)
"""

"""
    TODO
    Define an endpoint: GET /api/lessons/
    
    Parameters of the request:
        <LESSON_TYPE>
        <LESSON_LEVEL>
    
    Returns: 
        Returns everything the frontend needs to construct a lesson for a particular 
        lesson type. Eg. return JSON containing fields:
            {
                "course": "shapes",
                "lesson": "What's that Shape?",
                "prompt": "Select the square in each question to pass!",
                "questions": [
                    {
                        shapes: [{ shape: "square", colour: 0 }],
                        correctShape: "square",
                        difficulty: 1,
                        averageTime: 3,
                    },
                    {
                        shapes: [
                            { shape: "square", colour: 0 },
                            { shape: "circle", colour: 200 },
                        ],
                        correctShape: "square",
                        difficulty: 1,
                        averageTime: 5,
                    },
                    {
                        shapes: [
                            { shape: "square", colour: 0 },
                            { shape: "rectangle", colour: 45 },
                            { shape: "rectangle", colour: 300 },
                        ],
                        correctShape: "square",
                        difficulty: 2,
                        averageTime: 6,
                    },
                    ...
                ],
            }
"""

"""
    TODO
    Define an endpoint: POST /api/lessons/<LESSON_TYPE>/<LESSON_LEVEL>

    This endpoint takes in the child's performance as measured by the frontend and 
    saves it to the database.

    TODO What are the parameters we should be saving?
"""
