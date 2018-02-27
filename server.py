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

MODELAPITHREADS = []
aircraft = 2


@app.route('/', methods=['GET'])
def main():
    return render_template('main_screen.html', itemslist=backendController.getAircraftList())


@app.route('/about', methods=['GET'])
def about():
    return render_template('about_page.html')


@app.route('/descriptionDustAccumulationGraph', methods=['GET'])
def getDescriptionDustAccumulationGraph():
    return render_template('descriptions/descriptionDustAccumulationGraph.html')


@app.route('/descriptionDustExposureGraph', methods=['GET'])
def getDescriptionDustExposureGraph():
    return render_template('descriptions/descriptionDustExposureGraph.html')


@app.route('/descriptionFailChance', methods=['GET'])
def getDescriptionFailChance():
    return render_template('descriptions/descriptionFailChance.html')


@app.route('/descriptionHistogramPlot', methods=['GET'])
def getDescriptionHistogramPlot():
    return render_template('descriptions/descriptionHistogramPlot.html')


@app.route('/descriptionRiskPlot', methods=['GET'])
def getDescriptionRiskPlot():
    return render_template('descriptions/descriptionRiskPlot.html')


@app.route('/descriptionRULVariation', methods=['GET'])
def getDescriptionRULVariation():
    return render_template('descriptions/descriptionRULVariation.html')


@app.route('/descriptionRULWithDust', methods=['GET'])
def getDescriptionRULWithDust():
    return render_template('descriptions/descriptionRULWithDust.html')

@app.route('/failureTimeText', methods=['GET'])
def failureTimeTextTemplate():
    return render_template('failureTimeText.html')


@app.route('/dustExposureGraph', methods=['POST'])
def getDustExposure():
    return jsonify(backendController.getDustExposureData(aircraft))


@app.route('/dustAccumulationGraph', methods=['POST'])
def getDustAccumulation():
    return jsonify(backendController.getAccumulatedDustData(aircraft))


@app.route('/rulWithDust', methods=['POST'])
def getRULWithDust():
    return jsonify(backendController.getRULwithDust(aircraft))


@app.route('/histogram', methods=['POST'])
def getHistogram():
    return jsonify(backendController.getLifeDistHistogram())


@app.route('/multiChoice', methods=['POST'])
def choice():
    choices = request.form['choices'].split(",")
    graphType = request.args.get('type')
    if graphType == 'histo':
        return jsonify(backendController.getLifeDistHistogram(choices))
    else:
        return jsonify(backendController.getRiskGraphData(choices))


@app.route('/failchance', methods=['POST'])
def getFailChance():
    return jsonify(backendController.getFailureProbs(aircraft))


@app.route('/RULVariation', methods=['POST'])
def getRULVariation():
    return jsonify(backendController.getRULs(aircraft))


@app.route('/riskGraph', methods=['POST'])
def getRiskGraph():
    return jsonify(backendController.getRiskGraphData())


@app.route('/newEngineRequested', methods=['GET'])
def new_engine_request():
    global aircraft
    aircraft = request.args.get('engine')
    return 'The engine selected: ' + aircraft + ' was processed by the server'



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
    