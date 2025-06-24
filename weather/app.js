const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const resultDiv = document.getElementById("result");
const loader = document.getElementById("loader");

const API_KEY = "d076246ea87dab44a2301f8a12738c88"; // Replace with your real key if needed

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (city === "") {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  loader.style.display = "block";
  resultDiv.innerHTML = "";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling.");
      } else if (response.status === 401) {
        throw new Error("Invalid API key.");
      } else {
        throw new Error("Something went wrong. Try again later.");
      }
    }

    const data = await response.json();
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const weatherHTML = `
      <div class="weather-info">
        <h3>${data.name}, ${data.sys.country}</h3>
        <img src="${iconUrl}" alt="Weather icon">
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].main}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      </div>
    `;

    resultDiv.innerHTML = weatherHTML;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  } finally {
    loader.style.display = "none";
  }
});
