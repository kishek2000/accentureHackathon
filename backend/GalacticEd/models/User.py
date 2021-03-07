# Defining document schema
from GalacticEd.database_ops import (
    save_user
)

class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
        self.avatar = "https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
        self.children = []
        self._id = None

    def commit_user(self):
        self._id = save_user(self)
    
    @property
    def id(self):
        return self._id

    def __repr__(self):
        return "<user_id: {}, name: {}, email: {}>".format(
            self.id if self.id else "NOT SAVED TO DATABASE", 
            self.name, 
            self.email
        )

        
