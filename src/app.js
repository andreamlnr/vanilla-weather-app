function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}


function displayForecast(){
    let forecastElement = document.querySelector("#forecast");

    
    let days = ["Thu", "Fri", "Sat", "Sun"];

    let forecastHTML = `<div class="row">`;
    days.forEach(function(day){
        forecastHTML = 
        forecastHTML + 
        
        `<div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-night.png" alt="" width="42" />
       <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max"> 18° </span>
        <span class="weather-forecast-temperature-min"> 12° </span>
       </div>
        </div>
    `;
    });


forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;
}


function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let conditionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

  

    celsiusTemperature =  response.data.temperature.current;

    conditionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png` ) ;
    iconElement.setAttribute("alt", response.data.condition.description);
}


function search(cityName){
    let apiKey= "3b62fb4t4392eb6o683aa88b00be9cb2";
    let apiUrl=  `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event){
    event.preventDefault();
    let cityInputElemnt = document.querySelector("#city-input");
    search(cityInputElemnt.value);
}


function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature)

search("Budapest");
displayForecast();