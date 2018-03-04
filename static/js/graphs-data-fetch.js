/* sends a async POST to the server on some url prefix, with some arguments
 * for the server route that accepts the request, with some cache-type
 * where the incoming data will be stored in the big cache
 * and applying one of the plotting functions on the server's response content
 */
function getJSONFromBackend(path, callback, argument, cachetype) {
    url = path;
    xhr = new XMLHttpRequest();
    xhr.open("POST", url + argument, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState==4 && xhr.status==200){
            if (!xhr.response) return;
            graphCache[cachetype] = JSON.parse(xhr.response);
            callback(graphCache[cachetype]);
        }
    };
    xhr.send(null);
}
/* sends the ID of the aircraft selected from the drop-down by a GET request to the
 * server, displaying a fading alert on successful response
 */
function getEngineFromBackEnd(callback, argument, messageDivId) {
    var theUrl = "/newEngineRequested";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, messageDivId, true);
    }
    xmlHttp.open("GET", theUrl + argument, true); // true for asynchronous
    xmlHttp.send(null);
}

/*sends the uploaded file's content along with a POST request to the server
 * displays status message to the user
 */
function sendCSVToBackend() {
	$('#uploadUserMessage').show();
    var fileSelect = document.getElementById("file-select");
    var myFormData = new FormData();
    if(fileSelect.files.length == 0){ handleUploadReturn({"error":1, "message": "Please select a file."}); return; }
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
	setTimeout(function() { toggleUpload(hide = true);}, 2000);
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

