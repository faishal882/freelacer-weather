const apiKey = "b2e887db731c59a60df2e26e8ec1483b";
// var inputVal = document.getElementById("cityInput");
// var newVal = inputVal.value.trim();
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const searchBtn = document.querySelector(".btn");
const city = document.querySelector(".city-input");
const forecastContainer = document.querySelector(".future-weather");

window.addEventListener("DOMContentLoaded", function () {
  setPresentWeatherData(weatherData);
  displayFutureForecast(JSON.parse(localStorage.getItem("forecasts")).daily);
  displayHistory();
});

searchBtn.addEventListener("click", function () {
  fetchCurrentData(city.value, apiKey);
  city.value = "";
});

// FETCH CURRENT WEATHER DATA
var weatherData =
  JSON.parse(localStorage.getItem("weather_data")) ||
  fetchCurrentData("Aligarh", apiKey);

var history_data = [];
function fetchCurrentData(city, ApiKey) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.cod === "404") {
        alert(res.message);
      }
      console.log(res.coord.lon);
      localStorage.setItem("weather_data", JSON.stringify(res));
      weatherData = res;
      setPresentWeatherData(res);
      forecastingData(res.coord.lat, res.coord.lon);
    });
}

// FETCH FORECSATING DATA
function forecastingData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res.daily);
      displayFutureForecast(res.daily);
      localStorage.setItem("forecasts", JSON.stringify(res));
    });
}

// DISPLAY WEATHER DATA
const cityName = document.getElementById("present-weather-city");
const presentDate = document.getElementById("present-weather-date");
const Temp = document.getElementById("present-weather-temp");
const Humidity = document.getElementById("present-weather-humidity");
const Wind = document.getElementById("present-weather-wind");
function setPresentWeatherData(data) {
  cityName.innerHTML = data.name;
  presentDate.innerHTML = moment().format("DD/MM/YYYY");
  Temp.innerHTML = `${data.main.temp} C`;
  Humidity.innerHTML = `${data.main.humidity}%`;
  Wind.innerHTML = `${data.wind.speed} m/s`;
}

// DISPLAY WEATHER FORECASTING
function displayFutureForecast(forecasts) {
  let displayForecast = forecasts.map(function (forecast) {
    return `<div class="future-weather-card">
            <div class="future-weather-data">
              <p>Date</p>
              <p id="future-weather-date">${moment(forecast.dt * 1000).format(
                "DD/MM/YYYY"
              )}</p>
            </div>
            <div class="future-weather-data">
              <p>Temperature</p>
              <p id="future-weather-temp">${forecast.temp.day} C</p>
            </div>
            <div class="future-weather-data">
              <p>Humidity</p>
              <p id="future-weather-humidity">${forecast.humidity}%</p>
            </div>
            <div class="future-weather-data">
              <p>Wind Speed</p>
              <p id="future-weather-wind">${forecast.wind_speed} m/s</p>
            </div>
          </div>`;
  });
  displayItem = displayForecast.join("");
  forecastContainer.innerHTML = displayItem;
}

// SEARCH HISTORY
const historyContainer = document.querySelector(".search-history-data");

function displayHistory(history) {
  console.log("history");
}

// searchBtn.addEventListener("click", function (event) {
//   event.preventDefault();
//   localStorage.setItem("newVal", newVal.value);
//   getAPIKey();
// });

// function getAPIKey() {
//   var newUrl =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     newVal.value +
//     "&units=imperial&appid=" +
//     apiKey;
//   newUrl();

//   fetch(newUrl).then(function (response) {
//     return response.json();
//   });
// }
