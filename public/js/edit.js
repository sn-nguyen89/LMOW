function radioChange(radio) {

    let buttonCheck = radio.value;
    let buttonText = document.querySelector("#button-text-div")
    let buttonLink = document.querySelector("#button-link-div")

    if (buttonCheck == "True") {
        buttonText.style.visibility = "visible";
        buttonLink.style.visibility = "visible";

    }else{
        buttonText.style.visibility = "hidden";
        buttonLink.style.visibility = "hidden";
    }
}

function contentTypeChange(radio) {
    let buttonCheck = radio.value;
    let roles = document.querySelector("#role-selection");

    let currentImage = document.querySelector("#currentImage");
    let currentPDF = document.querySelector("#currentPDF")
    let descriptionBox = document.querySelector("#descriptionBox")
    let titleBox = document.querySelector("#titleBox")

    if (buttonCheck == "board"){
        console.log(buttonCheck)
        roles.style.visibility = "visible";
        roles.style.maxHeight = "500px";
    }else{
        roles.style.visibility = "hidden";
        roles.style.maxHeight = "0px";
    }
    if (buttonCheck == "intro" || buttonCheck == "contentBox" || buttonCheck == "supporters" || buttonCheck == "lmow" || buttonCheck == "board" || buttonCheck == "row"){
        currentImage.style.visibility = "visible";
        currentImage.style.maxHeight = "500px";
    }else{
        currentImage.style.visibility = "hidden";
        currentImage.style.maxHeight = "0px";
    }
    if (buttonCheck == "button"){
        currentPDF.style.visibility = "visible";
        currentPDF.style.maxHeight = "600px";
        descriptionBox.style.visibility = "hidden";
        descriptionBox.style.maxHeight = "0px";
        titleBox.style.visibility = "hidden";
        titleBox.style.maxHeight = "0px";
    }else{
        currentPDF.style.visibility = "hidden";
        currentPDF.style.maxHeight = "0px";
        descriptionBox.style.visibility = "visible";
        descriptionBox.style.maxHeight = "50000px";
        titleBox.style.visibility = "visible";
        titleBox.style.maxHeight = "100px";
    }
}