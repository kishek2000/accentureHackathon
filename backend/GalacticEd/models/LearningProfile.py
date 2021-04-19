from math import exp

DEBUG = True

#Childs overall learning profile
class LearningProfile:
    def __init__(self, **kwargs):

        # Values that can be tweaked to adjust proficiency model (for this user)

        # Defaults
        self.prof_increase_scalar = 1.0
        self.prof_decrease_scalar = 1.0
        self.prof_sensitivity = 1.0

        self.expected_speed_scalar = 1.0
        self.time_sensitivity = 1.0
        
        # Pass in values
        for key, value in kwargs.items():
            setattr(self, key, value)

    # TODO: Temporary workaround for: "cannot encode object: <GalacticEd.models.LearningProfile.LearningProfile..."
    def get_as_dict(self):
        return {
            "prof_increase_scalar": self.prof_increase_scalar,
            "prof_decrease_scalar": self.prof_decrease_scalar,
            "prof_sensitivity": self.prof_sensitivity,
            "expected_speed_scalar": self.expected_speed_scalar,
            "time_sensitivity": self.time_sensitivity,
        }

    # Expected score of user x: float (0 < x < 1)
    def expectedScore(self, uRating, qRating):
        """
        Input: question rating
        Output: expected probability of user succesfully completing that question
        Other info: uses elo model https://en.wikipedia.org/wiki/Elo_rating_system#Theory
        """
        return 1 / (1 + pow(10, (qRating - uRating)/400))

    # Get user proficiency change using elo model and learning profile
    def getNewRating(self, uRating: float, qRating: float, expTime: float, actTime: float, nQuestions: int, nIncorrect: int):
        """
        Variables:
            qRating: average question rating
            expTime: expected completion time
            actTime: actual completion timme
            nQuestions: number of questions
            nIncorrect: number of questions incorrect
        
        Output: new elo rating for user

        Takes into consideration the learning profile variables
        """
        K = 80 * self.prof_sensitivity # K Factor (indicates rating flexibility)
        
        # Calculate expected result
        scoreExpected = self.expectedScore(uRating, qRating)

        debug(f"Expected score: {scoreExpected}")

        # Calculate actual result based on response accuracy
        totalResponses = nQuestions + nIncorrect
        responseAccuracy =  nQuestions / totalResponses
        scoreActual = responseAccuracy

        debug(f"Actual score: {scoreActual}")

        # Reference: https://en.wikipedia.org/wiki/Elo_rating_system#Theory
        adjustment = K * nQuestions * (scoreActual - scoreExpected)

        debug(f"Initial adjustment = {adjustment}")

        # Perform time adjustment with logistic function
        expTime *= self.expected_speed_scalar
        proportionalTimeDiff = (expTime - actTime) / expTime # Closer to zero -> actual time closer to expected time, >0 -> actual time was faster than expected time, <0 -> actual time was slower than expected
        timeScalar = logisticFunction(x = proportionalTimeDiff, L = 2, k = 1.0, x_0 = 0, inverse = (adjustment < 0))
        timeScalar = 1 + ((timeScalar - 1) * self.time_sensitivity)
        adjustment *= timeScalar
        debug(f"Time scalar = {timeScalar}")
        debug(f"After time adjustment = {adjustment}")

        if adjustment > 0:
            adjustment *= self.prof_increase_scalar
        else:
            adjustment *= self.prof_decrease_scalar
        
        debug(f"Net adjustment = {adjustment}")

        return uRating + adjustment

    
    

def debug(string):
    if DEBUG:
        print(string)
    
# https://en.wikipedia.org/wiki/Logistic_function
def logisticFunction(x, L = 2, k = 1.0, x_0 = 0, inverse=False):
    """
    Variables:
    L: Maximum value of function
    k: Steepness of the function
    x_0: location of midpoint
    inverse: if true, function is reflected across the y axis

    Returns:
    n: float ( 0 < n < L )

    """
    if not inverse:
        return L / (1 + exp( -k *(x - x_0)))
    else:
        return L / (1 + exp( k *(x - x_0)))

if __name__ == "__main__":
    profile = LearningProfile()
    print(profile.proficiency)
    print(profile.getRatingChange(200, 30, 20, 10, 2))
    