function insightsTabShow() {
    //Reset the selected graph to display the tilecontainers
    SELECTEDGRAPH = 0;
	showGraph()
	
	//Show all HTML elements in the "Insights" panel 
    $("#insightsPanel").show();
    $("#tilesContainer").show();
    $('#containerDropDown').show();
	
    //hide all the HTML elements of the "Comparisons" panel
    $("#comparisonsPanel").hide();
	
}

function comparisonsTabShow() {
    //Reset the selected graph to display the tilecontainers
	SELECTEDCOMPARISONGRAPH = 0;
	
	//Hide all HTML elements in the "Insights" panel
    $("#insightsPanel").hide();
    $("#graphContainer").hide();
    $("#containerMultiInput").hide();
	

	//Show all HTML elements in the "Comparisons" panel
    $("#comparisonInsideTileContainer").hide();
    $("#comparisonsPanel").show();
    $("#tilesContainerComparisons").show();
}

function displayComparisonTileContent() {
    $("#tilesContainerComparisons").hide();
    $("#comparisonInsideTileContainer").show();
    $("#containerMultiInput").show();
     $("#includeTextPrediction").show();
}
function displayGeoMap() {
    $("#tilesContainerComparisons").hide();
    $("#comparisonInsideTileContainer").show();
    $("#includeTextPrediction").hide();
    $("#backbutton").hide();
}