let current = new Date();

let h4 = document.querySelector("h4");
let h5 = document.querySelector("h5");

let date = current.getDate();
let hours = current.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = current.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[current.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[current.getMonth()];

h4.innerHTML = `${day} ${date} ${month}`;
h5.innerHTML = `${hours}:${minutes}`;

// function searchCity(event) {
//   event.preventDefault();
//   let currentCity = document.querySelector("#city-search-input");
//   let h1 = document.querySelector("h1");
//   h1.innerHTML = `${currentCity.value}`;
// }
// let cityForm = document.querySelector("#city-form");
// cityForm.addEventListener("submit", searchCity);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-sm-2">
    <div class="weather-forecast-date">
    <h6>${formatDay(forecastDay.dt)}</h6>
     <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
        class="forecast-icon"
      />
      <div class="weather-forecast-temps">
        <span class="weather-forecast-temp-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-temp-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
      </div>
      </div>`;

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `ce1871a4e8d3834f1e106be5fdeb2ff1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric;`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function findCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  let cityName = document.querySelector("h1");
  let cityChoice = searchInput.value;
  cityName.innerHTML = searchInput.value;
  let apiKey = `ce1871a4e8d3834f1e106be5fdeb2ff1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityChoice}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", findCity);

function showTemperature(response) {
  let celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("h2");
  temperatureDisplay.innerHTML = `${celsiusTemperature}`;
  let weatherDescription = document.querySelector("h3");
  let desc = `${response.data.weather[0].description}`;
  weatherDescription.innerHTML = `${desc}`;
  let humid = document.querySelector(".humid");
  let humidity = `${response.data.main.humidity}`;
  humid.innerHTML = `${humidity}%`;
  let wind = document.querySelector(".wind");
  let windSpeed = Math.round(`${response.data.wind.speed}`);
  wind.innerHTML = `${windSpeed} km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemp = `${response.data.main.temp}`;

  getForecast(response.data.coord);
}

// function handleSubmit(event) {
//   event.preventDefault();
//   let city = document.querySelector("#city-search-input").value;
//   searchCity(city);
// }

function getLocation(position) {
  console.log(position);
  let apiKey = `ce1871a4e8d3834f1e106be5fdeb2ff1`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentButton = document.querySelector(".current-loc");
currentButton.addEventListener("click", getCurrentPosition);

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("h2");
  temperatureDisplay.innerHTML = Math.round(`${celsiusTemp}`);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (`${celsiusTemp}` * 9) / 5 + 32;
  let temperatureDisplay = document.querySelector("h2");
  temperatureDisplay.innerHTML = Math.round(`${fahrenheitTemperature}`);
}

let celsiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

// findCity("Oxford");

// function changeCelTemp(event) {
//   event.preventDefault;
//   let h2 = document.querySelector("h2");
//   h2.innerHTML = "19";
// }
// let celciusTempChange = document.querySelector("#celsius-link");
// celciusTempChange.addEventListener("click", changeCelTemp);

// function changeFahTemp(event) {
//   event.preventDefault;
//   let h2 = document.querySelector("h2");
//   h2.innerHTML = "66";
// }
// let fahrenheitTempChange = document.querySelector("#fahrenheit-link");
// fahrenheitTempChange.addEventListener("click", changeFahTemp);
