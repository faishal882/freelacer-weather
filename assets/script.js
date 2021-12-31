const apiKey = "b2e887db731c59a60df2e26e8ec1483b";
// var inputVal = document.getElementById("cityInput");
// var newVal = inputVal.value.trim();
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const searchBtn = document.querySelector(".btn");
const city = document.getElementById("cityInput");
const forecastContainer = document.querySelector(".future-weather");

window.addEventListener("DOMContentLoaded", function () {
  setPresentWeatherData(weatherData);
  displayFutureForecast(JSON.parse(localStorage.getItem("forecasts")).daily);
  displayHistory(history_data);
});

var history_data = JSON.parse(localStorage.getItem("history")) || [];
searchBtn.addEventListener("click", function () {
  fetchCurrentData(city.value, apiKey);
  if (city.value) {
    if (!history_data.includes(city.value)) {
      history_data.push(city.value);
      localStorage.setItem("history", JSON.stringify(history_data));
      displayHistory(history_data);
    }
    city.value = "";
  }
});

// FETCH CURRENT WEATHER DATA
var weatherData =
  JSON.parse(localStorage.getItem("weather_data")) ||
  fetchCurrentData("Delhi", apiKey);

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
    var color = "white";
    if (forecast.uvi >= 0 && forecast.uvi <= 2) {
      color = "green";
    }
    if (forecast.uvi > 2 && forecast.uvi <= 5) {
      color = "yellow";
    }
    if (forecast.uvi > 5 && forecast.uvi <= 7) {
      color = "orange";
    }
    if (forecast.uvi > 7 && forecast.uvi <= 10) {
      color = "red";
    }
    if (forecast.uvi > 11) {
      color = "violet";
    }

    return `<div class="future-weather-card">
            <div style="text-align: center; background: #fff;" class="icon">
              <img
                src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"
                alt="icon"
              />
            </div>
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
            <div class="future-weather-data" style="background: ${color};">
              <p>UV Index</p>
              <p id="future-weather-wind">${forecast.uvi}</p>
            </div>
          </div>`;
  });
  displayItem = displayForecast.join("");
  forecastContainer.innerHTML = displayItem;
}

// SEARCH HISTORY
const historyContainer = document.querySelector(".search-history-data");

function displayHistory(history) {
  let displayHistory = history.map(function (data) {
    return ` <p class="history-data">${data}</p>`;
  });
  displayItem = displayHistory.join("");
  historyContainer.innerHTML = displayItem;
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
