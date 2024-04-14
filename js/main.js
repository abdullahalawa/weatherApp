"use strict";

let cityNameInput = document.querySelector(".weather-Input");
let cityNamedisplay = document.querySelector(".city-name");

const apiKey = "076be003a33e4be784a141116241304";
let cityName = "Damascus";
let baseURL = `https://api.weatherapi.com/v1/forecast.json?q=${cityName}&key=${apiKey}&days=3`;
let data = {};

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

// getWeatherData("lon");

cityNameInput.addEventListener("input", async function (e) {
  data = await getWeatherData(cityNameInput.value);

  if (data == 400) {
    console.log("not valide city name");
  } else {
    cityNamedisplay.innerHTML = data.location.name;
  }
});
