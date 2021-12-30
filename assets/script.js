const apiKey = "b2e887db731c59a60df2e26e8ec1483b";
var inputVal = document.getElementById("cityInput");
var newVal = inputVal.value.trim();

// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const searchBtn = document.querySelector(".btn");
const city = document.querySelector(".city-input");

window.addEventListener("DOMContentLoaded", function () {
  setPresentWeatherData(weatherData);
});

var weatherData = JSON.parse(localStorage.getItem("weather_data"));
searchBtn.addEventListener("click", function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.cod === "404") {
        alert(res.message);
      }
      console.log(res.main.temp);
      localStorage.setItem("weather_data", JSON.stringify(res));
      weatherData = res;
      city.value = "";
      setPresentWeatherData(res);
    })
    .catch((err) => {
      alert(err.message);
    });
});

// PRESENT WEATHER DATA
const cityName = document.getElementById("present-weather-city");
const presentDate = document.getElementById("present-weather-date");
const Temp = document.getElementById("present-weather-temp");
const Humidity = document.getElementById("present-weather-humidity");
const Wind = document.getElementById("present-weather-wind");
function setPresentWeatherData(data) {
  cityName.innerHTML = data.name;
  presentDate.innerHTML = moment().format("DD/MM/YYYY");
  Temp.innerHTML = `${data.main.temp} F`;
  Humidity.innerHTML = `${data.main.humidity}%`;
  Wind.innerHTML = `${data.wind.speed} m/s`;
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
