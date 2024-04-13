"use strict";

const apiKey = "076be003a33e4be784a141116241304";
let cityName = "Damascus";
let baseURL = `https://api.weatherapi.com/v1/forecast.json?q=${cityName}&key=${apiKey}&days=3`;

async function getWeatherData() {
  let response = await fetch(baseURL);
  let data = await response.json();
  console.log(data);
}

getWeatherData();
