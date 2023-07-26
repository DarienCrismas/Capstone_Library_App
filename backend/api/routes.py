from flask import Blueprint, request, jsonify
from ..models import db, Library

api = Blueprint('api', __name__, url_prefix="/api")


# add one book
@api.post("/library")
def add_book():

    user_token = request.json["user_token"]
    cover = request.json["cover"]
    title = request.json["title"]
    author = request.json["author"]
    key = request.json["key"]
    description = request.json["description"]
    first_published = request.json["first_published"]
    status = request.json["status"]
    owned = request.json["owned"]
    user_score = request.json["user_score"]
    user_notes = request.json["user_notes"]

    

    book = Library( user_token, cover, title, author, key, description, first_published, status, owned, user_score, user_notes)

    db.session.add(book)
    db.session.commit()
    
    return book.to_dict()


# get all books
@api.get("/library/<token>")
def get_library(token):
    print(token)
    books = Library.query.filter_by(user_token = token).all()
    print(books)
    return [book.to_dict() for book in books]


#update one book
@api.put("/library/<id>")
def update_book(id):
    book = Library.query.get(id)

    
    book.status = request.json["status"]
    book.owned = request.json["owned"]
    book.user_score = request.json["user_score"]
    book.user_notes = request.json["user_notes"]

    db.session.commit()
    
    return book.to_dict()

#delete one book
@api.delete("/library/<id>")
def delete_book(id):
    book = Library.query.get(id)
    db.session.delete(book)
    db.session.commit()

    return book.to_dict()