/*used for the modal images in the About page*/
function dynamicFillModal(image,modalContainer) {
    document.getElementById(modalContainer).innerHTML =
        "<img class =\"fullScreenImage\" src=\"../static/photos/"+image+".png\" class=\"img-responsive\">"
}