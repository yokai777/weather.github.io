const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Fetch API key from environment

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

// Event Listener for Search Button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return alert("Please enter a city or country!");

  fetchWeatherData(query);
});

// Fetch Weather Data
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

// Display Weather Data
function displayWeatherData(data) {
  const { name, sys, weather, main, wind } = data;
  weatherResult.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h2>${name}, ${sys.country}</h2>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
      </div>
    </div>
  `;
}
