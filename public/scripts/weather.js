const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Fetch API key from environment

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const hourlyForecastContainer = document.getElementById("hourlyForecast");
///////


// Event Listener for Search Button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return alert("Please enter a city, country, or ZIP code!");

  fetchWeatherData(query);
  fetchHourlyForecast(query);
});

///////////////////////////////
// Fetch Current Weather Data
async function fetchWeatherData(query) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City, country, or ZIP code not found");
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    alert(error.message);
  }
}


/////////////////////////////////
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

////////////////////////////////
// Display Current Weather Data
function displayWeatherData(data) {
  const { name, sys, weather, main, wind } = data;
////
  // Update Header
  const header = document.querySelector("header p");
  if (header) {
    header.innerHTML = `<strong>${name}, ${sys.country}</strong> | ${main.temp}°C | <em>${weather[0].description}</em>`;
  }
////
  // Update Current Weather Section
  weatherResult.innerHTML = `
    <div class="card shadow border-0 bg-light">
      <div class="card-body">
        <h3 class="card-title text-primary"><strong>${name}, ${sys.country}</strong></h3>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Wind:</strong> ${wind.speed} m/s</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
      </div>
    </div>
  `;
}

///////////
// Display Hourly Weather Forecast
function displayHourlyForecast(data) {
  hourlyForecastContainer.innerHTML = ""; // Clear existing content
///
  // Filter 3-hourly forecasts (e.g., 09:00, 12:00, 15:00, etc.)
  const forecastItems = data.list.filter((item, index) => index % 3 === 0);

  forecastItems.forEach((forecast) => {
    const { dt_txt, main, weather } = forecast;
/////
    // Create a card for each forecast
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("col-md-4", "mb-3");
    forecastCard.innerHTML = `
      <div class="card shadow border-0 text-center bg-white">
        <div class="card-body">
          <h6 class="text-secondary">${new Date(dt_txt).toLocaleString([], {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}</h6>
          <p><strong>${main.temp}°C</strong></p>
          <p>${weather[0].description}</p>
        </div>
      </div>
    `;

    hourlyForecastContainer.appendChild(forecastCard);
  });
}
