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

function showRiskGraph() {
    SELECTEDCOMPARISONGRAPH = 6;
    if (graphCache['data_risk_graph'] == undefined)
        getJSONFromBackend('/riskGraph', plotRiskGraph, "", 'data_risk_graph');
    else
        plotRiskGraph(graphCache['data_risk_graph']);

    addTextToComparisonPanel('risk');
    displayComparisonTileContent();
}

function showHistogramGraph() {
    SELECTEDCOMPARISONGRAPH = 7;
    if (graphCache['histo_data'] == undefined)
        getJSONFromBackend('/histogram', plotDistributionOfCyclesGraph, "", 'histo_data');
    else
        plotDistributionOfCyclesGraph(graphCache['histo_data']);

    addTextToComparisonPanel('histo');
    displayComparisonTileContent();
}

function showMultiChoice() {
    var multi_list =  SELECTEDAIRCRAFTS;
    if(multi_list.length==0) return;
    if (multi_list.length > 0) {
        switch (SELECTEDCOMPARISONGRAPH) {
            case 6:
                asyncPOSTRequest(multi_list, '/multiChoice?type=risk', plotRiskGraph, 'choices');
                break;
            case 7:
                asyncPOSTRequest(multi_list, '/multiChoice?type=histo', plotDistributionOfCyclesGraph, 'choices');
                break;
        }
    }
}