/*loads the HTML elements of the in top-down fashion
 * this function handles the refreshing of the listeners in drop-down/multi-input
 */
function loadMainPage(){
    loadTextFromFileIntoLocation("pageTitle", "pageTitle");
    loadTextFromFileIntoLocation("pageHeader", "pageHeader").then(function() {
            getHtmlFromFile("uploadTemplate").then(function(data){
                    document.getElementById("navBar").innerHTML += data;
            });
            getHtmlFromFile("instructionsTemplate").then(function(data){
                    document.getElementById("welcomePanel").innerHTML += data;
            });
           document.getElementById("welcomeTitle").innerHTML = "Welcome to the predictive aircraft maintenance engine!";
    });

    loadTextFromFileIntoLocation("insightsPanel", "insightsPanel").then(function(){
            onLoad(AIRCRAFTLIST);
    });
    loadTextFromFileIntoLocation("comparisonsPanel", "comparisonsPanel").then(function(){
            onLoad(AIRCRAFTLIST);
    });

}
/*loads the HTML elements of the About page in top-down fashion*/
function loadAboutPage(){
    loadTextFromFileIntoLocation("pageTitle", "pageTitle");
    loadTextFromFileIntoLocation("pageHeader", "pageHeader").then(function() {
		document.getElementById("welcomeTitle").innerHTML = "About";
    });	
    loadTextFromFileIntoLocation("modelPanel", "modelPanel");
    loadTextFromFileIntoLocation("dAnalysisPanel", "dAnalysisPanel");
}
/*loads the HTML elements of the Login page in top-down fashion*/
function loadLoginPage(){
        loadTextFromFileIntoLocation("pageTitle", "pageTitle");
}