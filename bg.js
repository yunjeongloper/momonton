const body = document.querySelector("body");

const IMAGE_NUMBER = 7;
const BG_CN = "bgImage";

function paintImage(number) {
    const img = new Image();
    img.src = `images/${number}.jpg`;
    img.classList.add(BG_CN);
    body.prepend(img);
}

function getRandom() {
    const number = Math.floor(Math.random() * IMAGE_NUMBER + 1);
    return number;
}

function init() {
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();