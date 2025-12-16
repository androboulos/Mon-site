const apiKey = "47c5932af69e288d5d42913f70fc7c56"; // 🔑 47c5932af69e288d5d42913f70fc7c56

const inputVille = document.getElementById("ville");
const btn = document.getElementById("btn");
const resultat = document.getElementById("resultat");
const loader = document.getElementById("loader");

// clic bouton
btn.addEventListener("click", chercherMeteo);

// touche Entrée
inputVille.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    chercherMeteo();
  }
});

// charger dernière ville
const villeSauvegardee = localStorage.getItem("ville");
if (villeSauvegardee) {
  inputVille.value = villeSauvegardee;
  chercherMeteo();
}

function chercherMeteo() {
  const ville = inputVille.value.trim();
  if (ville === "") return;

  loader.style.display = "block";
  resultat.innerHTML = "";

  localStorage.setItem("ville", ville);

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&lang=fr&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      loader.style.display = "none";

      if (data.cod !== 200) {
        resultat.innerHTML = "❌ Ville introuvable";
        return;
      }

      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const weather = data.weather[0].main;

      let icon = "🌍";
      let className = "";

      if (weather === "Clear") {
        icon = "☀️";
        className = "sunny";
      } else if (weather === "Clouds") {
        icon = "☁️";
        className = "cloudy";
      } else if (weather === "Rain") {
        icon = "🌧️";
        className = "rainy";
      } else if (weather === "Snow") {
        icon = "❄️";
        className = "snowy";
      }

      resultat.innerHTML = `
        <div class="icon ${className}">${icon}</div>
        <div class="${className}">
          ${data.name} : ${temp}°C<br>
          ${desc}
        </div>
      `;
    })
    .catch(() => {
      loader.style.display = "none";
      resultat.innerHTML = "⚠️ Erreur de connexion";
    });

  inputVille.value = "";
}
