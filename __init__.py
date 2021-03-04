from flask import Flask
from flask_migrate import Migrate
from weather.config import Config

app = Flask(__name__)
app.config.from_object(Config)

from weather import routes