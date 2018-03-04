function displayInfoToUser(message, id, withTimeOut){
    alert = document.getElementById(id);
    alert.classList.add("info");
    alert.classList.remove("error");
    displayDivWithInnerHtml(alert, message, withTimeOut);
    showGraph();
}

function displayErrorToUser(message, id, withTimeOut){
    alert = document.getElementById(id);
    alert.classList.remove("info");
    alert.classList.add("error");
    displayDivWithInnerHtml(alert, message, withTimeOut);
}

function displayDivWithInnerHtml(div, html, withTimeOut){
    div.innerHTML = html;
    div.classList.remove("message-fade");
    div.hidden = false;
    if(withTimeOut)setTimeout(function() {startFadeOut(div)}, 3000);
}

function startFadeOut(el) {
    el.classList.add("message-fade");
    setTimeout(function() {el.hidden = true}, 1000);
}