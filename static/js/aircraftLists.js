/* executed on main-page start: it adds the aircraft list available
 * in the database to the dropdown, adds listeners to it and to
 * the muli-select tags and populates the dashboard
 */
function onLoad(aircraftList) {
    if(aircraftList == undefined) return;
    AIRCRAFTLIST = aircraftList;
    if(document.getElementById("dropDownList" ) == undefined) return;
    if(document.getElementById("tagList") == undefined) return;
    addAircraftItems(aircraftList);
    addListenersToDropdownItems();
    AddListenerToMultiSelect();
	pullDashboardData();
}

/*fills the drop-down with the list of aircraft already in the database*/
function addAircraftItems(data) {
    document.getElementById('dropDownList').innerHTML ="";
    for (i = 0; i < data.length; i++) {
        addNewAircraftItems(data[i]);
    }
}

/* adds event listener on the dropdown of Insights panel so it handles dynamically added items*/
function addListenersToDropdownItems() {
    var dropMenu = document.getElementById('dropDownList');
    dropMenu.addEventListener("click", function (e) {
        if (e.target && e.target.matches("li.highlight-on-hover")) {
            event.preventDefault();
            clearCache();
            var argument = "?engine=" + e.target.innerHTML.split(' ')[1];
            getEngineFromBackEnd(displayInfoToUser, argument, "insightsUserMessage");
            document.getElementById('dropDownButton').innerHTML = "Selected: " +  e.target.innerHTML + "<span class=\"glyphicon glyphicon-menu-down\" style=\"margin-left: 20px \"></span>";
        }
    });
}

/*takes an aircraft id and adds it to the list and dropdown- after new testing data is uploaded and predictions computed */
function addNewAircraftItems(newAircraft) {
    document.getElementById('dropDownList').innerHTML += "<li class = \"highlight-on-hover\">" + newAircraft + "</li>";
}

/* Filter function for the dropdown menu, so that users can search though the list faster */
function filterFunction() {
    var input, filter, a, i;
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