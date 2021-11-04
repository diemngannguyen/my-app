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
  let celciusTemperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("h2");
  temperatureDisplay.innerHTML = `${celciusTemperature}`;
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
}

function getLocation(position) {
  console.log(position);
  let apiKey = `ce1871a4e8d3834f1e106be5fdeb2ff1`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentButton = document.querySelector(".current-loc");
currentButton.addEventListener("click", getCurrentPosition);

function getFahrenheitTemperature(event) {
  let h2 = document.querySelector("h2");
}

// function changeCelTemp(event) {
//   event.preventDefault;
//   let h2 = document.querySelector("h2");
//   h2.innerHTML = "19";
// }
// let celciusTempChange = document.querySelector("#celcius");
// celciusTempChange.addEventListener("click", changeCelTemp);

// function changeFahTemp(event) {
//   event.preventDefault;
//   let h2 = document.querySelector("h2");
//   h2.innerHTML = "66";
// }
// let fahrenheitTempChange = document.querySelector("#fahrenheit");
// fahrenheitTempChange.addEventListener("click", changeFahTemp);
