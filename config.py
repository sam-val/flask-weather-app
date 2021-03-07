import os

base_dir = os.path.abspath(os.path.dirname(__file__))

class Config():
    SECRET_KEY = 'f1d8e745f2e8642fbd0bff853306f553bcbd2975'
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(base_dir, "app.db")
    GOOGLEMAPS_KEY = os.environ.get("API_KEY_GOOGLE_WEATHER_FLASK") or "AIzaSyDYgqO5Oif6GBe1Ys5jjWpjDzQnqnlhGjc"