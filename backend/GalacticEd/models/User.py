# Defining document schema

import mongoengine as me
import datetime

class User(me.Document):
    name = me.StringField(required=True)
    email = me.EmailField(required=True, unique=True)
    password = me.StringField(required=True)                                     # TODO: make sure the password is being hashed prior to being stored
    registration_date = me.DateTimeField(default=datetime.datetime.utcnow)
