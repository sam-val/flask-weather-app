from weather import app
from flask import render_template, url_for, redirect, jsonify, request
from weather.utils import weather_from_cords
import json

@app.route('/', methods=['POST', 'GET'])
@app.route('/index', methods=['POST', 'GET'])
def index():
    return render_template("index.html")


@app.route('/location', methods=['POST', 'GET'])
def location():
    x = request.form['lat']
    return jsonify(x)