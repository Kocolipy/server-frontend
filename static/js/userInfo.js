function displayInfoToUser(message){
    alert = document.getElementById("userMessage")
    alert.classList.remove("message-fade");
    alert.innerHTML = message;
    alert.hidden = false;
    setTimeout(function() {startFadeOut(alert)}, 5000);
}

function startFadeOut(el) {
    el.classList.add("message-fade");
}