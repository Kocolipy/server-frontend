function showGraph() {
    $("#tilesContainer").hide();
    $("#graphContainer").show();
    switch (SELECTEDGRAPH) {
        case 0:
            $("#tilesContainer").show();
            $("#graphContainer").hide();
            break;
        case 1:
            if (graphCache['data_dust'] == undefined) getJSONFromBackend('/dustExposureGraph', dustExposureGraph, "", 'data_dust');
            else dustExposureGraph(graphCache['data_dust']);
            addDescriptionToInsight('dustExposureGraph');
            break;
        case 2:
            if (graphCache['RULVariation'] == undefined) getJSONFromBackend('/RULVariation', plotRULVariationGraph, "", 'RULVariation');
            else plotRULVariationGraph(graphCache['RULVariation']);
            addDescriptionToInsight('RULVariation');
            break;
        case 3:
            if (graphCache['dust_acc'] == undefined) getJSONFromBackend('/dustAccumulationGraph', dustAccumulationGraph, "", 'dust_acc');
            else dustAccumulationGraph(graphCache['dust_acc']);
            addDescriptionToInsight('dustAccumulationGraph');
            break;
        case 4:
            if (graphCache['fail_percent_chance'] == undefined) getJSONFromBackend('/failchance', failureChance, "", 'fail_percent_chance');
            else failureChance(graphCache['fail_percent_chance']);
            addDescriptionToInsight('failchance');
            break;
        case 5:
            if (graphCache['RUL_with_dust'] == undefined) getJSONFromBackend('/rulWithDust', RULwithDust, "", 'RUL_with_dust');
            else RULwithDust(graphCache ['RUL_with_dust']);
            addDescriptionToInsight('rulWithDust');
            break;
    }
    if ($("#graphContainer").is(":visible")) $("#includeTextInsightDescription").show();
}


function showComparisonGraph() {
    switch (SELECTEDCOMPARISONGRAPH) {
        case 1:
            if (graphCache['data_risk_graph ' + SELECTEDAIRCRAFTS.toString()] == undefined)
                getJSONFromBackend('/riskGraph', plotRiskGraph, "", 'data_risk_graph ' + SELECTEDAIRCRAFTS.toString());
            else
                plotRiskGraph(cache['data_risk_graph ' + SELECTEDAIRCRAFTS.toString()]);
            addTextToComparisonPanel('risk');
            displayComparisonTileContent();
            break;
        case 2:
            if (graphCache['histo_data ' + SELECTEDAIRCRAFTS.toString()] == undefined)
                getJSONFromBackend('/histogram', plotDistributionOfCyclesGraph, "", 'histo_data ' + SELECTEDAIRCRAFTS.toString());
            else
                plotDistributionOfCyclesGraph(cache['histo_data ' + SELECTEDAIRCRAFTS.toString()]);
            addTextToComparisonPanel('histo');
            displayComparisonTileContent();
            break;
        case 3:
            geoMap();
            addMapDescription();
            displayGeoMap();

    }
}

function showGeoMap() {
    geoMap();
    addMapDescription();
    displayGeoMap();

}

//This function uses ajax to update the page without the need to refresh the page
function asyncUpdateMultiChoice() {
    //Sort the SELECTEDAIRCRAFTS list
    SELECTEDAIRCRAFTS.sort(function (a, b) {
        return parseInt(a) - parseInt(b)
    })
    if (SELECTEDAIRCRAFTS.length == 0) return;
    if (SELECTEDAIRCRAFTS.length > 0) {
        switch (SELECTEDCOMPARISONGRAPH) {
            case 1:
                asyncPOSTRequest(SELECTEDAIRCRAFTS, '/updateMultiselection?type=risk', plotRiskGraph, 'choices');
                break;
            case 2:
                asyncPOSTRequest(SELECTEDAIRCRAFTS, '/updateMultiselection?type=histo', plotDistributionOfCyclesGraph, 'choices');
                break;
        }
    }
}