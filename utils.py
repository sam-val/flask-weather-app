from requests import get
import os

API_KEY_IPSTACK = os.environ.get('API_KEY_IPSTACK')
ipstack_endpoint = "http://api.ipstack.com/"


API_KEY_OPEN_WEATHER = os.environ.get('API_KEY_OPEN_WEATHER')
def weather_from_cords(lat,lon):

    rs = get(f"https://api.openweathermap.org/data/2.5/weather?lat={lat}?lon={lon}&appid={API_KEY_OPEN_WEATHER}")
    return rs.json()
