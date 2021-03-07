from flask import Flask
from flask_migrate import Migrate
from weather.config import Config
from flask_googlemaps import GoogleMaps

app = Flask(__name__)
app.config.from_object(Config)

GoogleMaps(app)


from weather import routes