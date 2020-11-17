let dateToday = new Date();

let h6 = document.querySelector("h6");

let date = dateToday.getDate();
let hours = dateToday.getHours();
let minutes = ("0" + dateToday.getMinutes()).substr(-2);


let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = week[dateToday.getDay()];

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
  "December"
];
let month = months[dateToday.getMonth()];

h6.innerHTML = `As of ${day}, ${month} ${date}, ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let apiKey = "b60a88cedc4311c68472f2500a9bfa39";
  let city = document.querySelector("#search-city-input").value;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(inputData);
}

function inputData(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let city = response.data.name;
  let country = response.data.sys.country;
  let feel = Math.round(response.data.main.feels_like);
  let humid = response.data.main.humidity;
  let windspeed = Math.round((response.data.wind.speed*18)/5);
  let h1 = document.querySelector("h1");
  let celsius = document.querySelector("#celsius-temp");
  let weather = document.querySelector("#weather-condition");
  let realFeel = document.querySelector(".feel");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector (".wind");
  let iconElement = document.querySelector (".weather-image-big");
  h1.innerHTML = `${city}, ${country}`;
  celsius.innerHTML = `${temperature} °C`;
  weather.innerHTML = `${description}`;
  realFeel.innerHTML = ` Real feel : ${feel} °C`;
  humidity.innerHTML = `Humidity: ${humid} %`;
  wind.innerHTML = `Wind Speed: ${windspeed} km/h`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}
let cityfinder = document.querySelector("#city-form");
cityfinder.addEventListener("submit", searchCity);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b60a88cedc4311c68472f2500a9bfa39";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayData);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getPosition);

function displayData(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let location = response.data.name;
  let country = response.data.sys.country;
  let feel = Math.round(response.data.main.feels_like);
  let humid = response.data.main.humidity;
  let windspeed = Math.round((response.data.wind.speed*18)/5);
  let h1 = document.querySelector("h1");
  let celsius = document.querySelector("#celsius-temp");
  let weather = document.querySelector("#weather-condition");
  let realFeel = document.querySelector(".feel");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector (".wind");
  let iconElement = document.querySelector (".weather-image-big");
  h1.innerHTML = `${location}, ${country}`;
  celsius.innerHTML = `${temperature} °C`;
  weather.innerHTML = `${description}`;
  realFeel.innerHTML = ` Real feel: ${feel} °C`;
  humidity.innerHTML = `Humidity: ${humid} %`;
  wind.innerHTML = `Wind Speed: ${windspeed} km/h`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}

