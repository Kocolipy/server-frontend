function loadMainPage(){
    loadTextFromFileIntoLocation("pageTitle", "pageTitle")
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
    loadTextFromFileIntoLocation("comparisonsPanel", "comparisonsPanel");

}

function loadAboutPage(){
    loadTextFromFileIntoLocation("pageTitle", "pageTitle")
    loadTextFromFileIntoLocation("pageHeader", "pageHeader").then(function() {
            document.getElementById("welcomeTitle").innerHTML = "About the service: ";
    });

}

function loadLoginPage(){
        loadTextFromFileIntoLocation("pageTitle", "pageTitle")
}