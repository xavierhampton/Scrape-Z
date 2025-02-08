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
    for v in nodes:
        if v["type"] == "RootNode":
            #Root Node Handling
            handleNode(v, nodes, edges)

    return "<p>Hello, World!</p>"

#Recursively handles nodes
def handleNode(n, nodes, edges):
    if n["type"] == "SaveNode":
        #Save Node Handling
        print("Save Node")

    elif n['type'] == "RootNode":
        #Root Node Handling
        print("Root Node")
        for v in findConnections(n, nodes, edges):
            handleNode(v, nodes, edges)

    elif n["type"] == "ClickNode":
        #Click Node Handling
        print("Click Node")
        for v in findConnections(n, nodes, edges):
            handleNode(v, nodes, edges)

#Finds a node by id
def findNode(id, nodes):
    for v in nodes:
        if v["id"] == id:
            return v
        
#Find all node children
def findConnections(n, nodes, edges):
    id = n["id"]
    children = []
    for e in edges:
        if e["source"] == id:
            children.append(findNode(e["target"], nodes))
    
    return children


