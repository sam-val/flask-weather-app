from requests import get
import os
import sys
from urllib.parse import urljoin, urlencode

API_KEY_IPSTACK = os.environ.get('API_KEY_IPSTACK')
ipstack_endpoint = "http://api.ipstack.com"

TIMEOUT = 5;

API_KEY_OPEN_WEATHER = os.environ.get('API_KEY_OPEN_WEATHER')
def weather_from_cords(lat,lon):
    rs = get(f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY_OPEN_WEATHER}", timeout=TIMEOUT)
    if rs is not None:
        if rs.status_code == 200:
            return rs.json()
    return None

def weather_from_ip(ip):
    url =  urljoin(ipstack_endpoint, f"{ip}?access_key={API_KEY_IPSTACK}")
    r = get(url, timeout=TIMEOUT)
    if r is not None:
        if r.status_code == 200:
            data_from_ip = r.json()
            # print(data_from_ip, file=sys.stderr) 
            lat, lon = data_from_ip['latitude'], data_from_ip['longitude']
            return weather_from_cords(lat,lon)
    return None

def get_my_own_ip():
    return get('https://api.ipify.org').text
