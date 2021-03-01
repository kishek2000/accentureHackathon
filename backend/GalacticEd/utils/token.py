import jwt
from GalacticEd import SECRET_KEY 
from GalacticEd.utils.colourisation import printColoured
from typing import Dict

def generate_token(user_data: Dict[str, str]) -> str:
    """
        Generates a unique JSON web token based on the input user data.

        Args:
            user_data (dict): of shape { 
                    user_id: str,
                    email: str
                }

        Returns:
            str: the JWT web token 
    """
    payload = {
        "user_id": user_data["user_id"],
        "email": user_data["email"],
    }
    printColoured("!!!!!!!!!! {} {}".format(payload["user_id"], payload["email"]))
    printColoured("{} {}".format(type(payload["user_id"]), type(payload["email"])))
    web_token = jwt.encode(payload, "ASS", algorithm="HS256")
    return web_token
