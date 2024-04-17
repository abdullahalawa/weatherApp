"use strict";

// catch all important elements in the dom
let cityNameInput = document.querySelector(".weather-Input");
let getCityWeatherBtn = document.querySelector("#weather-btn");

let cardOneDisplay = document.querySelector("#cardOne");
let cardtwoDisplay = document.querySelector("#cardTwo");
let cardthreeDisplay = document.querySelector("#cardThree");

let cityNamedisplay = document.querySelector(".city-name");

const apiKey = "076be003a33e4be784a141116241304";
let cityName = "Damascus";
let baseURL = `https://api.weatherapi.com/v1/forecast.json?q=${cityName}&key=${apiKey}&days=3`;
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
  console.log(currentDayName);
  cardOneDisplay.children[0].children[0].innerHTML = `${daysOfWeek[currentDay]}`;
  cardtwoDisplay.children[0].children[0].innerHTML = `${
    daysOfWeek[currentDay + 1]
  }`;
  cardthreeDisplay.children[0].children[0].innerHTML = `${
    daysOfWeek[currentDay + 2]
  }`;
}

//getWeatherData through API
async function getWeatherData(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${city}&key=${apiKey}&days=3`
  );

  if (response.status != 200) {
    return response.status;
  } else {
    let finalData = await response.json();
    return finalData;
    // console.log(finalData.location.name);
  }
}

cityNameInput.addEventListener("enter", async function (e) {
  data = await getWeatherData(cityNameInput.value);

  if (data == 400) {
    console.log("not valide city name");
  } else {
    cityNamedisplay.innerHTML = data.location.name;
  }
});
