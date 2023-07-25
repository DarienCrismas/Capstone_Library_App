from flask import Flask
from config import Config
from .api.routes import api
from .models import db as root_db, login_manager, ma
from flask_migrate import Migrate
from flask_cors import CORS
# from .misc_func import JSONEncoder


app = Flask(__name__)

app.register_blueprint(api)

app.config.from_object(Config)

root_db.init_app(app)
migrate = Migrate(app, root_db)

ma.init_app(app)
# login_manager.init_app(app)
# login_manager.login_view = "auth.signin"

# app.json.encoder = JSONEncoder

CORS(app)