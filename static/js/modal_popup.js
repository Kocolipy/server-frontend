function dynamicFillModal(image,modalContainer) {
    document.getElementById(modalContainer).innerHTML =
        "<img src=\"../static/photos/"+image+".png\" class=\"img-responsive\">"
}