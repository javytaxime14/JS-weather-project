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

let changeColour = document.querySelector("#colour-box");
  if (hours >= 8 && hours <= 12) {
    changeColour.classList.add("morning");
    changeColour.classList.remove("evening");
    changeColour.classList.remove("night");  
  }

  else if (hours >= 13 && hours <= 20) {
    changeColour.classList.add("evening");
    changeColour.classList.remove("morning");
    changeColour.classList.remove("night");
    
  }
  else if (hours >= 21 && hours < 8) {
    changeColour.classList.add("night");
    changeColour.classList.remove("morning");
    changeColour.classList.remove("evening");
  }

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = days[date.getDay()];
  return day;
}

function getLocation(response) {
    cityName = response.data.name;
    latitude = response.data.coord.lat;
    longitude = response.data.coord.lon;
    getWeather();
  }
  
  function getWeather() {
      apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;
      axios.get(`${apiUrl}`).then(showWeather).then(showForecast);
  }
  
  function showWeather(response) {
    let h1 = document.querySelector("h1");
    let temperatureElement = document.querySelector("#celsius-temp");
    let descriptionElement = document.querySelector("#weather-condition");
    let humidityElement = document.querySelector(".humidity");
    let realFeel = document.querySelector(".feel");
    let windElement = document.querySelector(".wind");
    let iconElement = document.querySelector(".weather-image-big");
  
    city= response.data.name;
    country= response.data.sys.country;
    celsiusTemperature = response.data.main.temp;
    latitude = response.data.coord.lat;
    longitude = response.data.coord.lon;
  
    
    h1.innerHTML = `${city}, ${country}`;
    temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
    descriptionElement.innerHTML = response.data.weather[0].main;
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
    realFeel.innerHTML = `Real Feel: ${Math.round(response.data.main.feels_like)} °C`;
    windElement.innerHTML = `Wind Speed: ${Math.round(3.6 * response.data.wind.speed)} km/h`;
    iconElement.setAttribute( "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }
  
  function getForecast() {
      apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(showForecast);
  }
  
  function showForecast(response) {
      let forecastElement = document.querySelector("#forecast");
      forecastElement.innerHTML = null;
      let forecast = null;
  
      for (let index = 0; index < 5; index++) {
        forecast = response.data.daily[index];
        forecastElement.innerHTML += `
        <div class="row-daily">
              ${formatDay(forecast.dt*1000)}
          <br />
              <img
              
                src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                alt="${forecast.weather[0].description}"/>
          <br />
              <div class="row-degrees">
              <span id="max">${Math.round(forecast.temp.max)}</span>°C | 
              <span id="min">${Math.round(forecast.temp.min)}</span>°C
              </div>
              </div>
      `;
      }
  }
  
  function search(city) {
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(`${apiUrl}`).then(showWeather).then(getForecast).catch(errorFunction);
  }
  
  function handleSubmit(event) {
      event.preventDefault();
      let searchInput = document.querySelector("#search-city-input");
      search(searchInput.value);
    }
    function errorFunction(error) {
      alert(
        "Sorry, the location was not found. Please enter a city name."
      );
    }
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  function showPosition(position) {
  
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      let gpsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  
      axios.get(`${gpsUrl}&appid=${apiKey}`).then(showWeather);
  
      apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
      
      axios.get(`${apiUrl}`).then(showForecast);
  }
  function getSomething() {
      apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
      console.log(apiUrl);
  }

  let cityName = null;
  let latitude = null;
  let longitude = null;
  
  let apiKey = "b60a88cedc4311c68472f2500a9bfa39";
  
  let celsiusTemperature = null;
  let units = "c";
  
  let form = document.querySelector("#city-form");
  form.addEventListener("submit", handleSubmit);
  
  let currentButton = document.querySelector("#current-location");
  currentButton.addEventListener("click", getCurrentPosition)
