const weatherContainer = document.querySelector(".js-weather");

const API_KEY = "ee41800f2b710544d63bc43170bdad5a";
const COORDS = "coords";

function getWeather(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temp = json.main.temp;
        const name = json.name;
        weatherContainer.innerText = `${temp} @ ${name}`;
    })
}

function saveCoords(data) {
    localStorage.setItem(COORDS, JSON.stringify(data));
}

function handleGeoSuccess(position) {
    const coordsObj = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    }
    saveCoords(coordsObj);
    getWeather(coordsObj.latitude, coordsObj.longitude);
}

function handleGeoError(error) {
    console.log(error.messsage);
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init() {
    loadCoords();
}

init();