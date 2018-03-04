/*adds the description text for each graph in Comparisons*/
function addTextToComparisonPanel(type) {
    $(document).ready(function (e) {
        switch (type) {
            case 'risk':
                loadTextFromFileIntoLocation("descriptionRiskPlot", "includeTextDescription" );
                break;
            case 'histo' :
                loadTextFromFileIntoLocation("descriptionHistogramPlot", "includeTextDescription" );
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
/*adds the description text for each graph in Insights*/
function addDescriptionToInsight(type) {
    $(document).ready(function (e) {
        loadTextFromFileIntoLocation("description" + capitaliseFirstLetter(type), "includeTextInsightDescription" )
    });
}
