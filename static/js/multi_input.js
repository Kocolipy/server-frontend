/* Add event listener to the multi selection panel
 * that calls addTagElement when 'space' or 'enter' is pressed
 * as well as delete option for the already added tags
 */
function AddListenerToMultiSelect() {
    var multi_list = document.getElementById('tagList');
    if(multi_list == undefined) return;
    multi_list.addEventListener("click", function (e) {
        if (e.target && e.target.matches("span.fa-close")) {
            event.preventDefault();
            var contentToDelete = jQuery(e.target.parentElement).find("span")[1].innerHTML;
            for (i = 0; i < SELECTEDAIRCRAFTS.length; i++)
                if (SELECTEDAIRCRAFTS[i] == contentToDelete)
                    SELECTEDAIRCRAFTS.splice(i, 1);
            e.target.parentElement.remove();
            asyncUpdateMultiChoice();
        }
    });
    $(document).ready(function () {
        //called when key is pressed in textbox
        $("#textBoxTags").keypress(function (e) {
            //if the letter is not digit then display error and don't type anything
            if (e.which == 0 || e.which == 13 || e.which == 32) {
                addTagElement()
            }
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                //display error message
                // $("#errmsg").html("Digits Only").show().fadeOut("slow");
                return false;
            }
        });
    });
}

/* Add input from multi-selection into global SELECTEDAIRCRAFTS list
 * and the tag in the list in order to allow the user to see what is the current selection
 */
function addTagElement() {
    var content = document.getElementById('textBoxTags').value;
    document.getElementById('textBoxTags').value = "";
    var aircrafts = AIRCRAFTLIST.map(x => x.split(" ")[1]);
	//Limit tag size to 10
    if (SELECTEDAIRCRAFTS.length < 10){
		if (aircrafts.includes(content)) {
			//Ignore duplicates
			if (!SELECTEDAIRCRAFTS.includes(content)) {
				SELECTEDAIRCRAFTS.push(content);
				document.getElementById("tagList").innerHTML +=
					"<li class = \"multi_input_tagElem\" ng-repeat=\"skill in skills\">\n" +
					"<span class=\"fa fa-close\"></span>\n" +
					"<span>" + content + "</span>\n" +
					"    </li>";
				asyncUpdateMultiChoice();
			}
			else {
			    displayInfoToUser("Duplicated aircraft", "comparisonAlert", true);
            }
		} else {
			//display error message
			displayInfoToUser("Invalid aircraft", "comparisonAlert", true);
		}
	}else{
		displayErrorToUser("Maximum number of aircrafts selected", "comparisonAlert", true);
	}
		
}
