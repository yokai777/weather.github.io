const form = document.getElementById("location-form");
const currentWeatherEl = document.getElementById("current-weather");
const forecastWeatherEl = document.getElementById("forecast-weather");

// OpenWeatherMap API
/////

const API_KEY = "your_openweathermap_api_key";
const API_URL = "https://api.openweathermap.org/data/2.5";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = document.getElementById("location").value.trim();
  if (!location) return alert("Please enter a location!");

  try {
    // Fetching current weather
    const currentWeather = await fetchCurrentWeather(location);
    displayCurrentWeather(currentWeather);

    // Fetching weather forecast
    const forecast = await fetchWeatherForecast(location);
    displayWeatherForecast(forecast);
  } catch (error) {
    alert("Unable to fetch weather data. Please try again.");
    console.error(error);
  }
});

async function fetchCurrentWeather(location) {
  const response = await fetch(
    `${API_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`
  );
  return response.json();
}

async function fetchWeatherForecast(location) {
  const response = await fetch(
    `${API_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`
  );
  return response.json();
}

function displayCurrentWeather(data) {
  currentWeatherEl.innerHTML = `
    <h3>${data.name}</h3>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
}

function displayWeatherForecast(data) {
  let forecastHtml = "<h3>5-Day Forecast</h3>";
  const dailyData = data.list.filter((entry) =>
    entry.dt_txt.includes("12:00:00")
  );

  dailyData.forEach((day) => {
    forecastHtml += `
      <div>
        <p>Date: ${day.dt_txt.split(" ")[0]}</p>
        <p>Temp: ${day.main.temp}°C</p>
        <p>Weather: ${day.weather[0].description}</p>
      </div>
    `;
  });

  forecastWeatherEl.innerHTML = forecastHtml;
}
