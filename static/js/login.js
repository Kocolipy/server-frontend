/* create a selector handle on the modal in Login page*/
var modal = document.getElementById('id01');

/*close the modal when the user clicks anywhere outside of it*/
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

loadLoginPage();