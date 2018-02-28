function loadMainPage(){
    loadTextFromFileIntoLocation("pageHeader", "pageHeader").then(function() {
            getHtmlFromFile("uploadTemplate").then(function(data){
                    document.getElementById("navBar").innerHTML += data;
            });
            getHtmlFromFile("instructionsTemplate").then(function(data){
                    document.getElementById("welcomePanel").innerHTML += data;
            });
           document.getElementById("welcomeTitle").innerHTML = "Welcome to the predictive aircraft maintenance engine!";
    });

    loadTextFromFileIntoLocation("insightsPanel", "insightsPanel");
    loadTextFromFileIntoLocation("comparisonsPanel", "comparisonsPanel");

}

function loadAboutPage(){
    loadTextFromFileIntoLocation("pageHeader", "pageHeader").then(function() {
            document.getElementById("welcomeTitle").innerHTML = "About the service: ";
    });

}