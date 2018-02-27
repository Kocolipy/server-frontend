function displayInfoToUser(message) {
    alert = document.getElementById("userMessage")
    alert.classList.remove("message-fade");
    alert.innerHTML = message;
    alert.hidden = false;
    showGraph();
    setTimeout(function () {
        startFadeOut(alert)
    }, 5000);
}

function startFadeOut(el) {
    el.classList.add("message-fade");
    setTimeout(function () {
        el.hidden = true
    }, 1000);
}