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
MODELAPITHREADS = [];
routes_data = {'routes': [{"id": "route1",
                           "latitudes": [48.8567, 43.8163],
                           "longitudes": [2.3510, -79.4287]},
                          {"id": "route2",
                           "latitudes": [48.8567, 52.8163],
                           "longitudes": [2.3510, -36.4287]},
                          {"id": "route3",
                           "latitudes": [ 52.8163, 43.8163, 36.5],
                           "longitudes": [-36.4287, -79.4287, 30.9]}
                          ],
               'airports': [{
                   "title": "Paris",
                   "latitude": 48.8567,
                   "longitude": 2.3510
               },
                   {
                       "title": "NY",
                       "latitude": 43.8163,
                       "longitude": -79.4287
                   },
                   {
                       "title": "London",
                       "latitude": 20,
                       "longitude": 30
                   }
               ]
               }

@app.route('/', methods=['GET'])
def login():
    return render_template('pages/login.html')


@app.route('/index', methods=['GET'])
def main():
    global AIRCRAFTS
    AIRCRAFTS = []
    return render_template('pages/main_screen.html', itemslist=AIRCRAFTLIST)


@app.route('/about', methods=['GET'])
def about():
    return render_template('pages/about_page.html')


@app.route('/insightsPanel', methods=['GET'])
def getInsightsPanel():
    return render_template('modules/insightsPanel.html', aircraftSelected="Aircraft " + AIRCRAFT)


@app.route('/descriptionDustAccumulationGraph', methods=['GET'])
def getDescriptionDustAccumulationGraph():
    return render_template('descriptions/descriptionDustAccumulationGraph.html')


@app.route('/descriptionDustExposureGraph', methods=['GET'])
def getDescriptionDustExposureGraph():
    return render_template('descriptions/descriptionDustExposureGraph.html')


@app.route('/descriptionFailchance', methods=['GET'])
def getDescriptionFailChance():
    return render_template('descriptions/descriptionFailChance.html')


@app.route('/descriptionHistogramPlot', methods=['GET'])
def getDescriptionHistogramPlot():
    return render_template('descriptions/descriptionHistogramPlot.html')


@app.route('/descriptionRiskPlot', methods=['GET'])
def getDescriptionRiskPlot():
    return render_template('descriptions/descriptionRiskPlot.html')


@app.route('/descriptionGeoMap', methods=['GET'])
def getDescriptionGeoMap():
    return render_template('descriptions/descriptionGeoMap.html')


@app.route('/descriptionRULVariation', methods=['GET'])
def getDescriptionRULVariation():
    return render_template('descriptions/descriptionRULVariation.html')


@app.route('/descriptionRulWithDust', methods=['GET'])
def getDescriptionRULWithDust():
    return render_template('descriptions/descriptionRULWithDust.html')


@app.route('/failureTimeText', methods=['GET'])
def failureTimeTextTemplate():
    return render_template('failureTimeText.html')


### Allow static html pages to be accessible via a link.
@app.route('/<string:page_name>/')
def render_static(page_name):
    return render_template('modules/%s.html' % page_name)


### Set the AIRCRAFT global variable to be thef selected aircraft which we will use as argument for the graphing functions
@app.route('/newEngineRequested', methods=['GET'])
def new_engine_request():
    global AIRCRAFT
    AIRCRAFT = request.args.get('engine')
    return 'The engine selected: ' + AIRCRAFT + ' was processed by the server'


@app.route('/dashboardData', methods=['POST'])
def getDashboard():
    return jsonify(backendController.getDashboardData(AIRCRAFT))


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


@app.route('/mapRoutes', methods=['POST'])
def getRoutes():
    return jsonify(routes_data)


### File upload    
@app.route('/send', methods=['POST'])
def upload():
    if request.method == 'POST':
        file = request.files['thefile'].read()
        csvString = file.decode("utf-8")
        try:
            MODELAPITHREADS = backendController.updateDatabaseWithCSV(csvString)
        except Exception as e:
            return jsonify({"error": 1, "message": str(e)});
        threadNum = 0;
        for thread in MODELAPITHREADS:
            if (thread.isAlive()):
                thread.join();
            returnValue = backendController.MODELAPIRETURNS[threadNum];
            if (backendController.MODELAPIRETURNS[threadNum] == 0):  # success
                continue
            elif (backendController.MODELAPIRETURNS[threadNum] == 1):  # time out error
                return jsonify({"error": 1, "message": "Was a timeout error at the server"})
            elif (backendController.MODELAPIRETURNS[threadNum] == 2):  # other error
                return jsonify({"error": 1, "message": "A server error occurs please try again later"})
            else:
                print("unknown return value from upload CSV: " + backendController.MODELAPIRETURNS[threadNum]);
                return jsonify({"error": 1, "message": "Was a return error at the server"})
            threadNum += 1;
        return jsonify({"success": 1, "message": "Data has been uploaded to server successfully"})


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
