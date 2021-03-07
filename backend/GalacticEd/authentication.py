from typing import Dict 
from GalacticEd.utils.token import generate_token
from GalacticEd.utils.input_validator import is_email_valid
from GalacticEd.utils.colourisation import printColoured
from GalacticEd.exceptions import InvalidUserInput
from GalacticEd.database_ops import (
    save_user,
    get_user,
    password_verified
)
from GalacticEd.models import User

def login(email: str, password: str) -> Dict[str, str]:
    """
        Matches the given login details with an existing user in the database.

        Args:
            email (str)
            password (str)

        Returns:
            dict of shape: { user_id: str, token: str }
    """
    # Exceptions
    if not is_email_valid(email):
        raise InvalidUserInput(description="{} is not a valid email".format(email))

    user = get_user(email=email)
    if user == None:
        raise InvalidUserInput("That email does not belong to any user!")

    if not password_verified(email, password):
        raise InvalidUserInput(description="The password doesn't match the provided email")

    # Generate token
    token = generate_token({
        "user_id": user["_id"],
        "email": email
    })

    printColoured(" ➤ Logged in successfully: {}".format(email))
    
    return {
        "token": token,
        "user_id": user["_id"]
    }

def register(username: str, email: str, password: str, confirm_password: str) -> Dict[str, str]:
    """
        Commits a new user document with the given details to the database.

        Args:
            username (str)
            email (str)
            password (str)

        Returns:
            dict of shape: { user_id: str, token: str }
    """
    # Exceptions
    if password != confirm_password:
        raise InvalidUserInput("Passwords do not match")

    if not is_email_valid(email):
        raise InvalidUserInput(description="{} is not a valid email".format(email))

    if get_user(email=email) != None:
        raise InvalidUserInput(f'The email {email} is already in use')

    # Create new user
    new_user = User(name=username, email=email, password=password)
    new_user.commit_user()
    printColoured(" ➤ Registered a user with details: name: {}, email: {}".format(username, email))

    # Return token
    token = generate_token({
        "user_id": new_user._id,
        "email": email
    })

    return {
        "user_id": new_user._id,
        "token": token
    }

