import math 

# Update user proficiency using elo model
def getNewRating(qRating: float, uRating: float , expTime: float, actTime: float, nIncorrect: int):
    K = 80 # K Factor (indicates rating flexibility)
    
    # Calculate expected result
    scoreExpected = 1 / (1 + pow(10, (uRating - qRating)/400))

    if (nIncorrect == 0):
        scoreActual = 1
    else:
        # For now, multiple incorrect answers are counted as just one incorrect answer
        scoreActual = 0

    # Reference: https://en.wikipedia.org/wiki/Elo_rating_system#Theory
    adjustment = K * (scoreActual - scoreExpected)
    # Perform time adjustment TODO

    # Apply elo adjustment to get new elo 
    newRating = uRating + adjustment

    return newRating

# sample calculation
#print(getNewRating(1000, 800, 1, 1, 0))