function addTagElement() {
    var content = document.getElementById('textBoxTags').value;
	document.getElementById('textBoxTags').value = "";
	aircrafts = AIRCRAFTLIST.map(x => x.split(" ")[1]);
	if (aircrafts.includes(content)){
		//Ignore duplicates
		if (!SELECTEDAIRCRAFTS.includes(content)){
			SELECTEDAIRCRAFTS.push(content)
			document.getElementById("tagList").innerHTML += "<li class = \"multi_input_tagElem\" ng-repeat=\"skill in skills\">\n" +
				"      <span class=\"fa fa-close\"   ></span>\n" +
				"      <span>" + content + "</span>\n" +
				"    </li>";
			multiChoice();
		}
	} else { 
		//display error message
		console.log("Invalid aircraft");
	}
}

function addSelfRemoveListener() {
    var multi_list = document.getElementById('tagList');
    multi_list.addEventListener("click", function (e) {
        if (e.target && e.target.matches("span.fa-close")) {
            event.preventDefault();
            e.target.parentElement.remove();
        }
    });
    $(document).ready(function () {
	//called when key is pressed in textbox
	$("#textBoxTags").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
		if (e.which == 0 || e.which == 13 || e.which == 32){
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
