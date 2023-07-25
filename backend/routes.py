from api import api
from flask import render_template

@api.get("/")
def index():
    return render_template("index.html")