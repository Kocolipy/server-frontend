function loadTextFromFileIntoLocation(filename, writeLocationId){
    $.ajax({
        url: '/' + filename,
        type: 'GET',
        processData: false,
        contentType: false,
        dataType: 'html',
        success: [function (data) {
            document.getElementById(writeLocationId).innerHTML = data;
            console.log(data);
        }]
    });
}