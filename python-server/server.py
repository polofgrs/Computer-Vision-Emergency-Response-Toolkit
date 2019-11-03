#!/usr/bin/python
# import sys
# from __future__ import division

from flask import Flask, request, Response
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def get():
    if request.method == 'POST':
        algorithm = request.json.get('algorithm')
        sourcePath = request.json.get('sourcePath')
        targetPath = request.json.get('targetPath')
        parameters = request.json.get('parameters')
        print(algorithm)
        print(sourcePath)
        print(targetPath)
        print(parameters)
        response = Response(status=200)
    elif request.method == 'GET':
        response = Response(status=200)
    return(response)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
