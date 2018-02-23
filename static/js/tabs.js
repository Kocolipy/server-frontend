function graphTabShow() {
    /*hide all the HTML elements of the "Comparisons" panel*/
    $("#comparisonsPanel").hide();
    $("#aircraftPanel").hide();
    $("#graphContainer").hide();
    $("#containerMultiInput").hide();

    $("#insightsPanel").show();
    $("#tilesContainer").show();
    $('#containerDropDown').show();
}

function predictionTabShow() {
    showRiskAndHisto();
    $('#containerMultiInput').show();
    $("#insightsPanel").hide();	
    $("#aircraftPanel").hide();
    $("#graphContainer").hide();
    $("#comparisonsPanel").show();
}

function aircraftsTabShow() {
    $("#containerMultiInput").hide();
    $("#insightsPanel").hide();
    $("#comparisonsPanel").hide();
    $("#aircraftPanel").show();
}
