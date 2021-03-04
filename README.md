# Galactic Ed

This is the repo for the Accenture Hackathon about the Autism Awareness platform. GalacticEd, our prototype, was awarded 1st place out of 37 teams!

We plan to deploy a live version of our prototype very soon (still slightly buggy), click <a href="https://galactic-ed.xyz">here</a>.

To see it in action in our presentation, you can watch this <a href="https://www.youtube.com/watch?v=uWQ4hUP4L0k">video</a>.

## API Quick Documentation:

### Test Routes:

-   GET `/api/test`
-   GET `/api/test/db`
-   POST `/api/test/db`

### Authentication Routes:

-   POST `/api/auth/login`
    -   Parameters: `email`, `password`
    -   Returns: JSON containing `user_id`, `token`
-   POST `/api/auth/register`
    -   Parameters: `username`, `email`, `password`
    -   Returns: JSON containing `user_id`, `token`
-   GET `/api/auth/google/login`
-   GET `/api/auth/google/login/callback`

### Courses/Lessons Routes:

-   GET `/api/courses/lessons`
    - Returns data in the <a href="https://gist.github.com/Tymotex/b25b5d6ad9b9a9e8a5c9b0253581abd0">JSON format here</a>  
-   GET `/api/courses/all`
    - Returns data in the <a href="https://gist.github.com/Tymotex/b25b5d6ad9b9a9e8a5c9b0253581abd0">JSON format here</a>  

### Statistics Routes:
-   GET `/api/profile/stats`
    - Parameters: `user_id`
    - Returns data in the <a href="https://gist.github.com/Tymotex/b25b5d6ad9b9a9e8a5c9b0253581abd0">JSON format here</a>  
-   POST `/api/profile/stats`   # NOT DONE


### User Statistics Routes:

[TODO]!!!


### JSON Formats/Document Schema:
The JSON formats here specify the schema for the MongoDB documents AND what the data structures exchanged between frontend and backend look like.

https://gist.github.com/Tymotex/b25b5d6ad9b9a9e8a5c9b0253581abd0



<!-- #### Lessons:
The JSON formats here specify the schema for MongoDB documents.

Sample:
```
{
    "_id": "123asdf",
    "course": "shapes",
    "lesson": "What's that Shape?",
    "prompt": "Select the square in each question to pass!",
    "questions": [
        {
            "shapes": [{ "shape": "square", "colour": 0 }],
            "correctShape": "square",
            "difficulty": 1,
            "averageTime": 3,
        },
        {
            "shapes": [
                { "shape": "square", "colour": 0 },
                { "shape": "circle", "colour": 200 },
            ],
            "correctShape": "square",
            "difficulty": 1,
            "averageTime": 5,
        },
        {
            "shapes": [
                { "shape": "square", "colour": 0 },
                { "shape": "rectangle", "colour": 45 },
                { "shape": "rectangle", "colour": 300 },
            ],
            "correctShape": "square",
            "difficulty": 2,
            "averageTime": 6,
        },
    ],
}
```

#### Lesson Outcome:
Every lesson, upon completion, should produce a summary in this format.

Sample:
```
{
    "lessonId": "shapes-lvl-1",
    "lessonName": "What's that Shape?",
    "questions": [
        {
            "questionId": "square",
            "incorrectClicks": 12,
            "startTime": "sometimestring",
            "endTime": "endtimestring",
        },
        ...
    ]
}
```

#### Courses Simple List:
Format for an array of all courses available.

Sample:
```
[
  {
    "title": "shapes",
    "image": "/shapesHeader.png",
    "description": "Let's learn about the world of shapes!",
    "lessons": [
      {
        "level": "1",
        "title": "Matching Shapes",
        "description": "Choose the right shape, between two!",
      },
      {
        "level": "2",
        "title": "Matching Shapes",
        "description":
          "Choose the right shape, but this time with multiple other shapes!",
      },
      {
        "level": "3",
        "title": "Match Harder Shapes",
        "description": "Choose the right shape, among a few other shapes!",
      },
    ],
  },
  ...
]
```

#### Performance Statistics
Format for an array of a user's performance across all categories.

Sample:
```
[
  {
    "label": "Shapes",
    "data": [
      39, 40, 42, 45, 47, 41, 44, 40, 55, 58, 60, 55, 58, 61, 62, 57, 65, 68, 69, 75, 74, 72, 75, 77, 78, 79, 80, 75, 72, 82, 85, 90, 91
    ],
    "lastMonthChange": "24%",
    "lastWeekChange": "31%",
    "times": [                   // How long the user spent on this category
      {
        "label": "This Month",
        "data": 22.7,              
      },
      {
        "label": "This Week",
        "data": 4.28,
      },
    ]
  },
  ...
];
```







### Problem Statement

![Problem statement](https://raw.githubusercontent.com/kishek2000/accentureHackathon/master/images/problem-statement.png)

Note: HarukaMa is Tim Zhang -->
