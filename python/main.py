#Imports
from bs4 import BeautifulSoup
from flask import Flask
from flask import request

app = Flask(__name__)

#Establishes GET Request for defualt route
@app.route("/", methods=["GET"])
def ping():
    return "<p>Hello, World!</p>"

#Establishes the webserver's POST route
@app.route("/", methods=["POST"])
def main():
    content = request.get_json()
    return "<p>Hello, World2!</p>"







