from weather import app
from flask import render_template, url_for, redirect, jsonify, request
from weather.utils import weather_from_cords, weather_from_ip, get_my_own_ip, weather_from_city
import json

@app.route('/', methods=['POST', 'GET'])
@app.route('/index', methods=['POST', 'GET'])
def index():
    ip = request.remote_addr
    ip = get_my_own_ip() if ip == "127.0.0.1" else ip
    weather = weather_from_ip(ip)
    return render_template("index.html", ip=ip, weather = weather)

@app.route('/login', methods=['POST', 'GET'])
def login():
    pass

@app.route('/logout', methods=['POST', 'GET'])
def logout():
    pass

# AJAX
@app.route('/location', methods=['POST', 'GET'])
def location():
    lat, lon = request.form['lat'], request.form['lon']
    rs = weather_from_cords(lat,lon)
    return jsonify(rs)


@app.route('/weatherbycity', methods=['POST', 'GET'])
def weather_by_city():
    # lat, lon = request.form['lat'], request.form['lon']
    id = request.form['id']
    rs = weather_from_city(id)
    return jsonify(rs)