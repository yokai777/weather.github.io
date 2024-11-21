const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Fetch API key from environment

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const hourlyForecastContainer = document.getElementById("hourlyForecast");

// Event Listener for Search Button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return alert("Please enter a city or country!");

  fetchWeatherData(query);
  fetchHourlyForecast(query);
});

// Fetch Current Weather Data
async function fetchWeatherData(query) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City or country not found");
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    alert(error.message);
  }
}

// Fetch Hourly Weather Forecast
async function fetchHourlyForecast(query) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Unable to fetch forecast");
    const data = await response.json();
    displayHourlyForecast(data);
  } catch (error) {
    console.error(error.message);
  }
}

// Display Current Weather Data
function displayWeatherData(data) {
  const { name, sys, weather, main, wind } = data;

  // Update Header
  const header = document.querySelector("header p");
  if (header) {
    header.textContent = `${name}, ${sys.country} | ${main.temp}°C | ${weather[0].description}`;
  }

  // Update Current Weather Section
  weatherResult.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h2>${name}, ${sys.country}</h2>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Wind:</strong> ${wind.speed} m/s</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
      </div>
    </div>
  `;
}

// Display Hourly Weather Forecast
function displayHourlyForecast(data) {
  hourlyForecastContainer.innerHTML = ""; // Clear existing content

  // Filter 3-hourly forecasts (e.g., 09:00, 12:00, 15:00, etc.)
  const forecastItems = data.list.filter((item) => item.dt_txt.includes("09:00:00"));

  forecastItems.forEach((forecast) => {
    const { dt_txt, main, weather } = forecast;

    // Create a card for each forecast
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("col-md-4");
    forecastCard.innerHTML = `
      <div class="card">
        <div class="card-body text-center">
          <h5>${new Date(dt_txt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</h5>
          <p><strong>${main.temp}°C</strong></p>
          <p>${weather[0].description}</p>
        </div>
      </div>
    `;

    hourlyForecastContainer.appendChild(forecastCard);
  });
}
