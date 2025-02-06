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
    #Gets Data from Post Request
    data = request.get_json(silent=True)
    nodes = data["nodes"]
    edges = data["edges"]

    #Iterates through all node types and finds Root Nodes
    for v in nodes.values():
        if v["type"] == "RootNode":
            #Root Node Handling
            print(v)

    return "<p>Hello, World!</p>"

