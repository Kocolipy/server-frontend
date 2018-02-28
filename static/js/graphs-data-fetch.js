/*sends a async GET to the server on some url, with some arguments
 *and applying the callback function on the server's response content
 */
function getJSONFromBackend(path, functions, argument, cachetype) {
    url = path;
    xhr = new XMLHttpRequest();
    xhr.open("POST", url + argument, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState==4 && xhr.status==200){
            if (!xhr.response) return;
            graphCache[cachetype] = JSON.parse(xhr.response);
            functions(graphCache[cachetype]);
        }
    };
    xhr.send(null);
}

function getEngineFromBackEnd(callback, argument, messageDivId) {
    // var url = BASE_URL + theUrl + "?" + argument;
    var theUrl = "/newEngineRequested";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, messageDivId, true);
    }
    xmlHttp.open("GET", theUrl + argument, true); // true for asynchronous
    xmlHttp.send(null);
}

function sendCSVToBackend() {
    var fileSelect = document.getElementById("file-select");
    var myFormData = new FormData();
    myFormData.append('thefile', fileSelect.files[0]);
    displayInfoToUser("Sending Data","uploadUserMessage", false);
    $.ajax({
        url: '/send',
        type: 'POST',
        processData: false,
        contentType: false,
        dataType: 'json',
        data: myFormData,
        success: [function (data) {
            handleUploadReturn(data);
        }]
    });
}

function handleUploadReturn(data){
    if(data["error"] == 1){
        displayErrorToUser(data["message"], "uploadUserMessage", false);
    }
    else if(data["success"] == 1){
        displayInfoToUser(data["message"], "uploadUserMessage", false);
    }
}

function asyncPOSTRequest(data, path, callback, name) {
    var myFormData = new FormData();
    myFormData.append(name, data);
    $.ajax({
        url: path,
        type: 'POST',
        processData: false,
        contentType: false,
        dataType: 'json',
        data: myFormData,
        success: [function (response) {
            callback(response);
        }]
    });
}

