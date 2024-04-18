"use strict";

// catch all important elements in the dom
let cityNameInput = document.querySelector(".weather-Input");
let getCityWeatherBtn = document.querySelector("#weather-btn");

let cardOneDisplay = document.querySelector("#cardOne");
let cardtwoDisplay = document.querySelector("#cardTwo");
let cardthreeDisplay = document.querySelector("#cardThree");

const apiKey = "076be003a33e4be784a141116241304";
let cityName = "Damascus";
// let baseURL = `https://api.weatherapi.com/v1/forecast.json?q=${cityName}&key=${apiKey}&days=3`;
let data = {};

//Get Day Name
{
  const currentDate = new Date();
  let currentDay = currentDate.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayName = daysOfWeek[currentDay];
  cardOneDisplay.children[0].children[0].innerHTML = `${daysOfWeek[currentDay]}`;
  cardtwoDisplay.children[0].children[0].innerHTML = `${
    daysOfWeek[currentDay + 1]
  }`;
  cardthreeDisplay.children[0].children[0].innerHTML = `${
    daysOfWeek[currentDay + 2]
  }`;
}

getWeatherData("London");

// Get the date
function getFormatedDate(someDate) {
  const date = new Date(someDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  let finalDate = `${day}${month}`;

  return finalDate;
}

// Calculate the direction of the wind
function formateWindDirectionFromDegrees(degrees) {
  const directions = [
    "North",
    "North East",
    "East",
    "South East",
    "South",
    "South West",
    "West",
    "North West",
  ];

  // Calculate the index based on the degrees
  const index = Math.round(degrees / 45) % 8;

  // Return the corresponding direction
  return directions[index];
}

//getWeatherData through API
async function getWeatherData(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${city}&key=${apiKey}&days=3`
  );

  let finalData = await response.json();

  if (response.status === 200) {
    // Current Day Data
    // City Name
    cardOneDisplay.lastElementChild.children[0].innerHTML = `${finalData.location.name}`;

    // Date
    cardOneDisplay.firstElementChild.lastElementChild.innerHTML =
      getFormatedDate(finalData.forecast.forecastday[0].date);
    // Average Tempreture
    cardOneDisplay.lastElementChild.children[1].firstElementChild.innerHTML = `${finalData.forecast.forecastday[0].day.avgtemp_c}<sup>o</sup>C</sup>`;
    // Weather Icon
    cardOneDisplay.lastElementChild.children[1].children[1].src = `https://${finalData.forecast.forecastday[0].day.condition.icon}`;
    // Weather State title
    cardOneDisplay.lastElementChild.children[1].nextElementSibling.innerHTML = `${finalData.forecast.forecastday[0].day.condition.text}`;
    // daily chance of rain
    cardOneDisplay.lastElementChild.lastElementChild.firstElementChild.lastElementChild.innerHTML = `${finalData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    // Max Wind Kph
    cardOneDisplay.lastElementChild.lastElementChild.children[1].lastElementChild.innerHTML = `${finalData.forecast.forecastday[0].day.maxwind_kph}km/h`;
    // Wind Direction
    cardOneDisplay.lastElementChild.lastElementChild.children[2].lastElementChild.innerHTML = `${formateWindDirectionFromDegrees(
      finalData.forecast.forecastday[0].hour[0].wind_degree
    )}`;

    // Second Day Data
    // Weather Icon
    cardtwoDisplay.lastElementChild.firstElementChild.firstElementChild.src = `https://${finalData.forecast.forecastday[1].day.condition.icon}`;
    // max Temp
    cardtwoDisplay.lastElementChild.firstElementChild.children[1].innerHTML = `${finalData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
    // min Temp
    cardtwoDisplay.lastElementChild.firstElementChild.children[2].innerHTML = `${finalData.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`;
    // Weather State title
    cardtwoDisplay.lastElementChild.firstElementChild.nextElementSibling.innerHTML = `${finalData.forecast.forecastday[1].day.condition.text}`;

    // Thired Day Data
    // Weather Icon
    cardthreeDisplay.lastElementChild.firstElementChild.firstElementChild.src = `https://${finalData.forecast.forecastday[2].day.condition.icon}`;
    // max Temp
    cardthreeDisplay.lastElementChild.firstElementChild.children[1].innerHTML = `${finalData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
    // min Temp
    cardthreeDisplay.lastElementChild.firstElementChild.children[2].innerHTML = `${finalData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C`;
    // Weather State title
    cardthreeDisplay.lastElementChild.firstElementChild.nextElementSibling.innerHTML = `${finalData.forecast.forecastday[2].day.condition.text}`;
  }
}

cityNameInput.addEventListener("input", async function (e) {
  if (cityNameInput.value.length > 2) {
    getWeatherData(cityNameInput.value);
  }
});

getCityWeatherBtn.addEventListener("click", async function (e) {
  getWeatherData(cityNameInput.value);
});
