function insightsTabShow() {
    //Reset the selected graph to display the tilecontainers
    SELECTEDGRAPH = 0;
	showGraph();
	$('html, body').animate({scrollTop: $("#secondaryMenu").offset().top}, 400);
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
	$('html, body').animate({scrollTop: $("#secondaryMenu").offset().top}, 400);
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
}

function displayGeoMap() {
    $("#tilesContainerComparisons").hide();
    $("#comparisonInsideTileContainer").show();
}

/*Upload Button */
function toggleUpload(hide = false){
	if (hide || $('#uploadPanel').is( ":visible" )){
		$('#uploadPanel').hide();
		$('#uploadUserMessage').hide();
	}
	else $('#uploadPanel').show();
}

/*About Page Tabs */
function modelSpecTabShow(){
	$('html, body').animate({scrollTop: $("#secondaryMenu").offset().top}, 400);
    $("#dAnalysisPanel").hide();
    $("#modelPanel").show();
	
}
function dAnalysisTabShow(){
	$('html, body').animate({scrollTop: $("#secondaryMenu").offset().top}, 400);
    $("#dAnalysisPanel").show();
    $("#modelPanel").hide();
}
