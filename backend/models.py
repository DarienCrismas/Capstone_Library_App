from flask_sqlalchemy import SQLAlchemy
import uuid 
from datetime import datetime
from werkzeug.security import generate_password_hash
import secrets
from flask_login import UserMixin, LoginManager
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
login_manager = LoginManager()
ma = Marshmallow()




class Library(db.Model):
    id = db.Column(db.String, primary_key = True)
    user_token = db.Column(db.String(50), nullable = True)
    cover = db.Column(db.String(350), nullable = True)
    title = db.Column(db.String(50))
    author = db.Column(db.String(50))
    key = db.Column(db.String(50))
    description = db.Column(db.Text, nullable = True)
    first_published = db.Column(db.String(50), nullable = True)
    status = db.Column(db.String(20), nullable = True)
    owned = db.Column(db.String(50))
    user_score = db.Column(db.String(10), nullable = True)
    user_notes = db.Column(db.Text, nullable = True)
    

    def __init__(self, user_token, cover, title, author, key, description, first_published, status = "", owned = "", user_score = "", user_notes = ""):
        self.id = self.set_id()
        self.user_token = user_token
        self.cover = cover
        self.title = title
        self.author = author
        self.key = key
        self.description = description
        self.first_published = first_published
        self.status = status
        self.owned = owned
        self.user_score = user_score
        self.user_notes = user_notes 
        

    def set_id(self):
        return str(uuid.uuid4())
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_token": self.user_token,
            "cover": self.cover,
            "title": self.title,
            "author": self.author,
            "key": self.key,
            "description": self.description,
            "first_published": self.first_published,
            "status": self.status,
            "owned": self.owned,
            "user_score": self.user_score,
            "user_notes": self.user_notes,
        }