function addTextToComparisonPanel(type) {
    $(document).ready(function (e) {
        switch (type) {
            case 'risk':
                loadTextFromFileIntoLocation("descriptionRiskPlot", "includeTextDescription" );
                addFailureTimeText();
                break;
            case 'histo' :
                loadTextFromFileIntoLocation("descriptionHistogramPlot", "includeTextDescription" );
                addFailureTimeText();
                break;
            case 'map' :
                loadTextFromFileIntoLocation("descriptionGeoMap", "includeTextDescription");
                break;
        }
    });
}

function capitaliseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addDescriptionToInsight(type) {
    $(document).ready(function (e) {
        loadTextFromFileIntoLocation("description" + capitaliseFirstLetter(type), "includeTextInsightDescription" )
    });
}

function addFailureTimeText() {
      var listair = [{'ID': 6, 'predicted': 25, 'working': 30}, {'ID': 20, 'predicted': 8, 'working': 66},
            {'ID': 7, 'predicted': 25, 'working': 30}, {'ID': 32, 'predicted': 88, 'working': 30}];
    $(document).ready(function (e) {
        loadTextFromFileIntoLocation("failureTimeText", "includeTextPrediction").then(function() {
                addIndividualAircraftPrediction(listair);
        });
    });
}

function addIndividualAircraftPrediction(list) {

    for (i = 0; i < list.length; i++) {
        document.getElementById("aircraftsText").innerHTML += "<h3 class='fordescription' id=\"aircraftName\" style='padding-top: 10px'>Aircraft ID: " + list[i]['ID'] +
            "</h3>\n" +
            "                        <tr style=\"width: 100%\">\n" +
            "                            <td  >\n" +
            "                                <p>\n" +
            "                                    <span class=\"glyphicon glyphicon-hourglass\"></span>\n" +
            "                                    Predicted number of cycles until failure from now on:\n" +
            "                                </p>\n" +
            "                            </td>\n" +
            "                            <td id=\"predictedCyclesIndivAircraft\" class=\"text-primary\">\n"
            + list[i]['predicted'] + " </td>\n" +
            "                            <td  >\n" +
            "                                <p>\n" +
            "                                    <span class=\"glyphicon glyphicon-hourglass\"></span>\n" +
            "                                  Number of already worked cycles by the engine:\n" +
            "                                </p>\n" +
            "                            </td>\n" +
            "                            <td id=\"workedCyclesIndivAircraft\" class=\"text-primary\">\n" +
            +list[i]['working'] +
            "                            </td>\n" +
            "                        </tr>";
    }

}
