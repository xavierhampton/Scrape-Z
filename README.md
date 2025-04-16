# 🕷️ Scrape-Z

**Scrape-Z** is a full-stack web application that lets you visually build web scraping workflows using a drag-and-drop node graph. Define actions like setting a URL, clicking page elements, and saving data — all without writing a single line of scraper code.

Built with **React Flow** for a clean, draggable UI and **Flask** on the backend to run customizable scraping logic locally.

Note: This software is still in development and there may be bugs.

---

## 🛡️ Security Warning
This application writes files onto your computer. Do <b>not</b> deploy this on the public web without special security measures.

## ⚙️ Tech Stack

-  **Frontend**: React + React Flow  
-  **Backend**: Python Flask  
-  **Scraping Logic**: BeautifulSoup, Requests, and Selenium  

---

## 🧩 Node Types

Each node represents an action in your scraping pipeline. The graph structure determines execution order and branching behavior.

- 🔗 **Root Node**  
  - Sets the **starting URL**
- 🖱️ **Click Node**  
  - Simulates a click on an element using a **CSS selector**
- 💾 **Save Node**  
  - Saves extracted content to a **file path** specified by the user

> Combine these nodes to create multi-step scraping workflows. Nodes can branch and nest to handle complex sites.

---

## 🖼️ UI Preview

<img src="https://github.com/xavierhampton/Scrape-Z/blob/demo/assets/demo2.png" width= 600 />

---

## 🚀 Getting Started

### 🔧 Prerequisites

- **Node.js** 
- **Python** 
- **pip** for Python dependencies

---

### 1. Clone the Repository

```bash
git clone https://github.com/xavierhampton/Scrape-Z.git
cd Scrape-Z
```

### 2. Set Up The Flask Server
```bash
cd python
pip install -r requirements.txt
python main.py
```

### 3. Load Up The Front-End
```bash
cd javascript
npm install
npm start
```




