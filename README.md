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

[TODO]

-   GET `/api/courses`

### Problem Statement

![Problem statement](https://raw.githubusercontent.com/kishek2000/accentureHackathon/master/images/problem-statement.png)

Note: HarukaMa is Tim Zhang
