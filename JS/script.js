const POKEMON_API = "https://pokeapi.co/api/v2";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";

const velden = [
  { id: "naam", boodschap: "Vul minimaal 2 tekens in." },
  { id: "email", boodschap: "Vul een geldig e-mailadres in." },
  { id: "bericht", boodschap: "Schrijf minimaal 10 tekens." }
];

const contactToggle = document.getElementById("contact-toggle");
const contactForm = document.getElementById("contact-form");
const naamInput = document.getElementById("naam");

contactToggle.addEventListener("click", () => {
  contactForm.hidden = !contactForm.hidden;
  contactToggle.textContent = contactForm.hidden
    ? "Contactformulier tonen" : "Contactformulier verbergen";
});

function valideerVeld(veld) {
  const input = document.querySelector(`#${veld.id}`);
  const fout = document.querySelector(`#${veld.id}-error`);
  const geldig = input.checkValidity();

  fout.textContent = geldig ? "" : veld.boodschap;
  input.setAttribute("aria-invalid", String(!geldig));
  return geldig;
}

function valideerFormulier() {
  return velden.map(valideerVeld).every(Boolean);
}

function verwerkFormulier(event) {
  event.preventDefault();

  const status = document.getElementById("form-status");

  if (!valideerFormulier()) {
    status.textContent = "Er zijn nog fouten in het formulier.";
    return;
  }

  status.textContent = "Bericht verzonden! Bedankt.";
  event.target.reset();
}

document.getElementById("contact-form")
  .addEventListener("submit", verwerkFormulier);

const textarea = document.getElementById("bericht");
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
});


let huidigePokemon = "marshadow";

async function haalPokemon(naam) {
  const response = await fetch(
    `${POKEMON_API}/pokemon/${naam.toLowerCase()}`
  );
  if (!response.ok) throw new Error("Pokémon niet gevonden.");
  return response.json();
}

function toonPokemon(pokemon) {
  const animated =
    pokemon.sprites.versions?.["generation-v"]?.["black-white"]
      ?.animated?.front_default;

  const normal = pokemon.sprites.front_default;
  const gebruikAnimated =
    document.getElementById("animations-enabled").checked;

  document.getElementById("pokemon-description").textContent =
    `My favorite Pokémon is ${pokemon.name}!`;

  document.getElementById("pokemon-display").innerHTML =
    `<img src="${gebruikAnimated && animated ? animated : normal}"
          alt="Sprite van ${pokemon.name}">`;
}

async function zoekPokemon() {
  const naam = document.getElementById("pokemon-search").value.trim();
  const status = document.getElementById("pokemon-status");

 if (!naam) {
  status.textContent = "Vul een Pokémon naam in.";
  return;
}

  try {
    const pokemon = await haalPokemon(naam);
    huidigePokemon = pokemon.name;
    toonPokemon(pokemon);
    status.textContent = "";
  } catch (error) {
    status.textContent = "Pokémon niet gevonden.";
  }

}

async function laadPokemon() {
  const status = document.getElementById("pokemon-status");
  status.textContent = "Pokémon worden geladen...";
  try {
    const response = await fetch(`${POKEMON_API}/pokemon?limit=2000`);
    const data = await response.json();

    data.results.forEach((pokemon) => {
      const optie = document.createElement("option");
      optie.value = pokemon.name;
      document.getElementById("pokemon-list").appendChild(optie);
    });
    status.textContent = "";
  } catch (error) {
    status.textContent = "Pokémon konden niet worden geladen.";
  }
}

document.getElementById("pokemon-search-button")
  .addEventListener("click", zoekPokemon);

document.getElementById("animations-enabled")
  .addEventListener("change", async () => {
    toonPokemon(await haalPokemon(huidigePokemon));
  });

laadPokemon();
haalPokemon("marshadow").then(toonPokemon);


async function haalWeer(lat, lon, plaats, land = "") {
  const result = document.getElementById("weather-result");
  result.textContent = "Weer wordt geladen...";
  try {

    const url =
      `${WEATHER_API}?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m` +
      `&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Weer ophalen mislukt.");

    const data = await response.json();
    const w = data.current;

    const codes = {
      0: "Helder", 1: "Overwegend helder", 2: "Gedeeltelijk bewolkt",
      3: "Bewolkt", 45: "Mist", 48: "Mist", 51: "Motregen",
      53: "Motregen", 55: "Zware motregen", 61: "Lichte regen",
      63: "Regen", 65: "Zware regen", 71: "Lichte sneeuw",
      73: "Sneeuw", 75: "Zware sneeuw", 80: "Regenbuien",
      81: "Regenbuien", 82: "Zware regenbuien", 95: "Onweer"
    };

    document.getElementById("weather-result").innerHTML = `
    <h3>${plaats}${land ? `, ${land}` : ""}</h3>
    <p>🌡️ ${w.temperature_2m} °C</p>
    <p>🌡️ Gevoel: ${w.apparent_temperature} °C</p>
    <p>💧 ${w.relative_humidity_2m}% luchtvochtigheid</p>
    <p>☁️ ${codes[w.weather_code] ?? "Onbekend"}</p>
    <p>💨 ${w.wind_speed_10m} km/u</p>`;
  } catch (error) {
    result.textContent = "Het weer kon niet worden opgehaald.";
  }
}

document.getElementById("location-button")
  .addEventListener("click", () => {
    const result = document.getElementById("weather-result");

    if (!navigator.geolocation) {
      result.textContent = "Locatie wordt niet ondersteund.";
      return;
    }

    result.textContent = "Locatie wordt opgehaald...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        haalWeer(
          position.coords.latitude,
          position.coords.longitude,
          "Jouw locatie"
        );
      },
      () => {
        result.textContent = "Locatietoegang is geweigerd.";
      }
    );
  });


document.getElementById("city-search-button")
  .addEventListener("click", async () => {
    const stad = document.getElementById("city-search").value.trim();
    const result = document.getElementById("weather-result");

      if (!stad) {
        result.textContent = "Vul een stad in.";
        return;
    }
    result.textContent = "Stad wordt gezocht...";

    try {
      const response = await fetch(
        `${GEO_API}?name=${encodeURIComponent(stad)}&count=1&language=nl&format=json`
      );

      if (!response.ok) throw new Error("Stad zoeken mislukt.");
      const data = await response.json();

      if (!data.results?.length) {
        result.textContent = "Stad niet gevonden.";
        return;
      }
      const locatie = data.results[0];

      await haalWeer(
        locatie.latitude,
        locatie.longitude,
        locatie.name,
        locatie.country
      );
    } catch (error) {
      result.textContent = "De stad kon niet worden opgezocht.";
    }
  });