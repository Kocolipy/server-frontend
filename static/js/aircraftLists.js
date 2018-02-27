/*add all the database aircrafts to lists and add listeners to both lists */
function onStartFillLists(aircraftList) {
    addAircraftItems(aircraftList);
    addListenersToDropdownItems();
    addSelfRemoveListener();
    AIRCRAFTLIST = aircraftList;
}

/*fills the lists with the list of aircrafts already in the database on web page open*/
function addAircraftItems(data) {
    for (i = 0; i < data.length; i++) {
        addNewAircraftItems(data[i]);
    }
}

/* adds event listener on the list of Aircrafts panel so it handles dynamically added items*/
function addListenersToListItems() {
    var dropmenu = document.getElementById('itemlist');
    dropmenu.addEventListener("click", function (e) {
        if (e.target && e.target.matches("li.highlight-on-hover")) {
            insightsTabShow();
            document.getElementById("tab2").checked = true;
            event.preventDefault();
            graphCache = {};
            var argument = "?engine=" + e.target.innerHTML.split(' ')[1];
            httpGetAsync("/newEngineRequested", displayInfoToUser, argument);
            document.getElementById('dropDownButton').innerHTML = e.target.innerHTML + " <span class=\"caret\"></span>";
        }
    });
}

/* adds event listener on the dropdown of Insights panel so it handles dynamically added items*/
function addListenersToDropdownItems() {
    var dropmenu = document.getElementById('dropDownList');
    dropmenu.addEventListener("click", function (e) {
        if (e.target && e.target.matches("li.highlight-on-hover")) {
            event.preventDefault();
            graphCache = {};
            var argument = "?engine=" + e.target.innerHTML.split(' ')[1];
            httpGetAsync("/newEngineRequested", displayInfoToUser, argument);
            document.getElementById('dropDownButton').innerHTML = "Selected: " +  e.target.innerHTML + " <span class=\"caret\"></span>";
            showGraph();
        }
    });
}

/*takes an aircraft id and adds it to the list and dropdown- after new testing data is uploaded and predictions computed */
function addNewAircraftItems(newAircraft) {
    document.getElementById('dropDownList').innerHTML += "<li class = \"highlight-on-hover\">" + newAircraft + "</li>";
}

/* Filter function for the dropdown menu, so that users can search though the list faster */
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropDownList");
    a = div.getElementsByTagName("li");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}