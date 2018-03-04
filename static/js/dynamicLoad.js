/* requests a file data to the server and loads
 * the contents the HTML file response into an empty container
 * it is used for loading the descriptions of individual graphs
 */
function loadTextFromFileIntoLocation(filename, writeLocationId){
    if(fileCache[filename] == undefined){
        return $.ajax({
            url: '/' + filename,
            type: 'GET',
            processData: false,
            contentType: false,
            dataType: 'html',
            success: [function (data) {
                $(document).ready(function () {
                        document.getElementById(writeLocationId).innerHTML = data;
                        fileCache[filename] = data;
                });
            }]
        });
    }
    else {
        $(document).ready(function () {
            document.getElementById(writeLocationId).innerHTML = fileCache[filename];
            return new Promise(function(res, rej){res(fileCache[filename]);});//this imediately returns a promise since some methods expect a promise to be returned
        });
    }
}
/* fetches a particular HTML file given as input and caches it */
function getHtmlFromFile(filename){
        if(fileCache[filename] == undefined){
        return $.ajax({
            url: '/' + filename,
            type: 'GET',
            processData: false,
            contentType: false,
            dataType: 'html',
            success: [function (data) {
                fileCache[filename] = data;
                return data;
            }]
        });
    }
    else {
        $(document).ready(function () {
            return new Promise(function(res, rej){res(fileCache[filename]);});//this imediately returns a promise since some methods expect a promise to be returned
        });
    }

}