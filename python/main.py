#Imports
from bs4 import BeautifulSoup
from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Establishes GET Request for defualt route
@app.route("/", methods=["GET"])
def ping():
    return "<p>Hello, World!</p>"

#Establishes the webserver's POST route
@app.route("/", methods=["POST"])
def main():
    content = request.get_json(silent=True)
    print(content)
    return "<p>Hello, World2!</p>"

