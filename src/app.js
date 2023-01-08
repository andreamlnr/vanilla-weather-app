function displayTemperature(response){

    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let conditionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    conditionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
  
}


let apiKey= "3b62fb4t4392eb6o683aa88b00be9cb2";
let cityName= "London";
let apiUrl=  `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);