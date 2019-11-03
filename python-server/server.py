#!/usr/bin/python
# import sys
# from __future__ import division

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app)

@app.route('/')
def get():
    return()


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
