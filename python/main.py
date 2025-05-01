#Imports
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from flask import Flask
import flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Establishes GET Request for defualt route
@app.route("/", methods=["GET"])
def ping():
    return flask.jsonify({"message": "Hello, World!"})

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
            print("Root Node")
            driver = webdriver.Chrome()

            driver.get(v["url"])

            #Waits for the page to load
            driver.implicitly_wait(0.5)

            handleNode(v, nodes, edges, driver)

    return "Successful!"

#Recursively handles nodes
def handleNode(n, nodes, edges, driver):
    if n["type"] == "SaveNode":
        #Save Node Handling
        print("Save Node")

    elif n["type"] == "ClickNode":
        #Click Node Handling
        driver.find_element(by=By.CSS_SELECTOR, value=n['data']["cssSelector"]).click()
        driver.implicitly_wait(0.5)

        print("Click Node")
        print(n["data"])

    elif n["type"] == "InputNode":
        #Input Node Handling
        driver.find_element(by=By.CSS_SELECTOR, value=n['data']["cssSelector"]).send_keys(n["data"]["input"])
        driver.implicitly_wait(0.5)

        print("Input Node")
        print(n["data"])

    for v in findConnections(n, nodes, edges):
        handleNode(v, nodes, edges,driver)

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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


