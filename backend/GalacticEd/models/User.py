# Defining document schema
from GalacticEd.database_ops import (
    save_user
)

class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
        self._id = None

    def commit_user(self):
        self._id = save_user(self)
    
    @property
    def id(self):
        return self._id

    def __repr__(self):
        return "<user_id: {}, name: {}, email: {}, password: {}>".format(
            self.id if self.id else "NOT SAVED TO DATABASE", 
            self.name, 
            self.email, 
            self.password
        )

        
