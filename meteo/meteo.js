const API_KEY = "47c5932af69e288d5d42913f70fc7c56";

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const result = document.getElementById("result");

  if (!city) {
    result.textContent = "⛔ Merci d’entrer une ville";
    return;
  }

  result.textContent = "⏳ Chargement...";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Ville introuvable");
    }

    const data = await response.json();

    result.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <p>🌡️ Température : ${data.main.temp} °C</p>
      <p>☁️ ${data.weather[0].description}</p>
      <p>💨 Vent : ${data.wind.speed} km/h</p>
    `;

  } catch (error) {
    result.textContent = "❌ Erreur : ville introuvable";
  }
}
