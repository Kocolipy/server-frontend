import os
import csv
import backendController

try:  # Windows needs stdio set for binary mode.
    import msvcrt

    msvcrt.setmode(0, os.O_BINARY)  # stdin  = 0
    msvcrt.setmode(1, os.O_BINARY)  # stdout = 1
except ImportError:
    pass

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

import urllib.request, json

AIRCRAFTLIST = backendController.getAircraftList()
AIRCRAFT = AIRCRAFTLIST[0].split(" ")[1]
AIRCRAFTS = []
MODELAPITHREADS = []

@app.route('/', methods=['GET'])
def main():
    return render_template('main_screen.html', itemslist=AIRCRAFTLIST)


@app.route('/about', methods=['GET'])
def about():
    return render_template('about_page.html')


@app.route('/description.html', methods=['GET'])
def include():
    return render_template('description.html', itemslist=backendController.getAircraftList())

### Insight Function calls

### Set the AIRCRAFT global variable to be the selected aircraft which we will use as argument for the graphing functions
@app.route('/newEngineRequested', methods=['GET'])
def new_engine_request():
    global AIRCRAFT
    AIRCRAFT = request.args.get('engine')
    return 'The engine selected: ' + AIRCRAFT + ' was processed by the server'
    
@app.route('/dustExposureGraph', methods=['POST'])
def getDustExposure():
    return jsonify(backendController.getDustExposureData(AIRCRAFT))

@app.route('/dustAccumulationGraph', methods=['POST'])
def getDustAccumulation():
    return jsonify(backendController.getAccumulatedDustData(AIRCRAFT))

@app.route('/RULVariation', methods=['POST'])
def getRULVariation():
    return jsonify(backendController.getRULs(AIRCRAFT))
    
@app.route('/rulWithDust', methods=['POST'])
def getRULWithDust():
    return jsonify(backendController.getRULwithDust(AIRCRAFT))

@app.route('/failchance', methods=['POST'])
def getFailChance():
    return jsonify(backendController.getFailureProbs(AIRCRAFT))

    
### Comparison Function calls

### Set AIRCRAFTS global variable to be the list of aircrafts in the multi-select which we will use as arguments for the graphing functions
@app.route('/updateMultiselection', methods=['POST'])
def updateMultiselection():
    global AIRCRAFTS
    choices = request.form['choices'].split(",")
    graphType = request.args.get('type')
    AIRCRAFTS = choices
    if graphType == 'risk':
        return jsonify(backendController.getRiskGraphData(AIRCRAFTS))
    if graphType == 'histo':
        return jsonify(backendController.getLifeDistHistogram(AIRCRAFTS))
        
@app.route('/riskGraph', methods=['POST'])
def getRiskGraph():
    return jsonify(backendController.getRiskGraphData(AIRCRAFTS))

@app.route('/histogram', methods=['POST'])
def getHistogram():
    return jsonify(backendController.getLifeDistHistogram(AIRCRAFTS))



### File upload    
@app.route('/send', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        file = request.files['thefile'].read()
        csvString = file.decode("utf-8")
        try:
            MODELAPITHREADS = backendController.updateDatabaseWithCSV(csvString)
        except Exception as e:
            print(e)  # Missing column data
        new_aircraft = 'Aircraft22'
        return jsonify(new_aircraft)


@app.route('/dynamicLoadableFile', methods =['GET'])
def dynamicLoad():
    return render_template('dynamicLoadableFile.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
    