import math 


# TODO: make this specific to each category 

# Update user proficiency using elo model
def getNewRating(qRating: float, uRating: float , expTime: float, actTime: float, nIncorrect: int):
    K = 95 # K Factor (indicates rating flexibility)
    
    # Calculate expected result
    scoreExpected = 1 / (1 + pow(10, (uRating - qRating)/400))


    # TODO: set max penalty
    # if (nIncorrect == 0):
    #     scoreActual = 1
    # else:
    #     # For now, multiple incorrect answers are counted as just one incorrect answer
    #     scoreActual = 0

    # Reference: https://en.wikipedia.org/wiki/Elo_rating_system#Theory
    if actTime >= expTime:
        K *= -0.05 * (actTime - expTime)   # TODO: temp moderator
    else:
        K *= 0.05 * (expTime - actTime) 

    adjustment = K #  * (scoreActual - scoreExpected)
    # Perform time adjustment TODO

    # Apply elo adjustment to get new elo 
    newRating = uRating + adjustment

    incorrect_penalty_factor = 10
    newRating -= nIncorrect * incorrect_penalty_factor

    return int(newRating)

# sample calculation
# print(getNewRating(1000, 800, 1, 1, 0))

