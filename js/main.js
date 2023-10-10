const gradientData = {
    color: ["", ""],
    angle: 90
}

const body = document.querySelector('body');
const labelColor = [...document.querySelectorAll(`label`)];
const inputColor = [...document.querySelectorAll(`input[type="color"]`)];
let colorOrientationInfo = document.querySelector(".color-orientation-info");
inputColor[0].value = "#c57830";
inputColor[1].value = "#69a356";

/*
  Mise à jour des couleurs
*/
function updateColor() {
    for (let i = 0; i < inputColor.length; i++) {
        labelColor[i].style.background = labelColor[i].textContent = gradientData.color[i] = inputColor[i].value;
    }
    colorOrientationInfo.textContent = `Orientation : ${gradientData.angle}°`
    body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.color[0]}, ${gradientData.color[1]})`;
    labelColorAdapt();
}
updateColor();

// Ecouteur sur les input colors
for (let i = 0; i < inputColor.length; i++) {
    inputColor[i].addEventListener("change", evt => {
        updateColor();
    }, false)
}

// Ecouteur sur le slider orientation
const inputRange = document.querySelector(`input[type="range"]`);
inputRange.addEventListener("input", evt => {
    gradientData.angle = Math.floor(evt.target.value * 3.6).toFixed(0);
    updateColor();
}, false)


// Ecouteur sur le bouton copier
colorButtonCopy = document.querySelector('.color-button-copy');
colorButtonCopy.addEventListener("click", evt => {
    navigator.clipboard.writeText(`linear-gradient(${gradientData.angle}deg, ${gradientData.color[0]}, ${gradientData.color[1]})`);
}, false)

// Ecouteur sur le bouton Random
colorButtonRandom = document.querySelector('.color-button-random');
colorButtonRandom.addEventListener("click", evt => {
    for (let i = 0; i < 2; i++) {
        let red = parseInt(Math.random() * 255).toString(16);
        let green = parseInt(Math.random() * 255).toString(16);
        let blue = parseInt(Math.random() * 255).toString(16);
        inputColor[i].value = "#" + red + green + blue;
    }
    inputRange.value = Math.random() * 100;
    gradientData.angle = Math.floor(inputRange.value * 3.6).toFixed(0);
    updateColor();

}, false)

/*
  Fonction de texte adapatif
*/
function labelColorAdapt() {
    // source : https://forum.hardware.fr/hfr/Graphisme/Infographie-2D/comment-composantes-rvb-sujet_9510_1.htm
    // Formule : 3r + 6v + 1b
    for (let i = 0; i < gradientData.color.length; i++) {
        if ((
            parseInt(gradientData.color[i].substring(1, 3), 16) * 3 +
            parseInt(gradientData.color[i].substring(1, 3), 16) * 6 +
            parseInt(gradientData.color[i].substring(1, 3), 16)
        ) > 1250) {
            labelColor[i].style.color = "black";
        }
        else {
            labelColor[i].style.color = "white";
        }
    }
}






























