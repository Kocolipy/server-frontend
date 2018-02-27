function loadTextFromFileIntoLocation(filename, writeLocationId){
    if(fileCache[filename] == undefined){
        return $.ajax({
            url: '/' + filename,
            type: 'GET',
            processData: false,
            contentType: false,
            dataType: 'html',
            success: [function (data) {
                document.getElementById(writeLocationId).innerHTML = data;
                fileCache[filename] = data;
            }]
        });
    }
    else {
        document.getElementById(writeLocationId).innerHTML  = fileCache[filename];
        return new Promise(function(res, rej){res();});//this imediately returns a promise since some methods expect a promise to be returned
    }
}