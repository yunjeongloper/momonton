const form = document.querySelector(".js-nameForm"),
    info = document.querySelector(".js-infoForm"),
    input = form.querySelector("input#name"),
    greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
const SHOW_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(text) {
    form.classList.add(SHOW_CN);
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text) {
    form.classList.remove(SHOW_CN);
    info.classList.add(SHOW_CN);
    greeting.classList.add(SHOW_CN);
    greeting.innerHTML = `Hello, ${text}`;
}

function handleReset() {
    localStorage.removeItem(USER_LS);
    greeting.classList.remove(SHOW_CN);
    form.classList.add(SHOW_CN);
}


function init(){
    const user = localStorage.getItem(USER_LS);

    if (user === null) {
        // there is no user
        askForName();
    } else {
        // i find user
        paintGreeting(user);
    }
}

init();