from requests import get

API_KEY_IPSTACK = "c45007a38ef3d30a0855d1fa9be4bc6c"
ipstack_endpoint = "http://api.ipstack.com/"


API_KEY_OPEN_WEATHER = "310c3d762791a9a38bd19a988224eea7"
api_key = 0
def weather_from_cords(lat,lon):

    rs = get(f"https://api.openweathermap.org/data/2.5/weather?lat={lat}?lon={lon}&appid={API_KEY_OPEN_WEATHER}")
    return rs.json()
