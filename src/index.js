function updateIcon(response) {
  const iconElement = document.querySelector("#weather-app-icon-image");
  const iconUrl = response.data.condition.icon_url;

  const iconMapping = {
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png":
      "Clear-Sky-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-night.png":
      "Clear-Sky-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png":
      "Few-Clouds-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-night.png":
      "Few-Clouds-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png":
      "Scattered-Clouds-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-night.png":
      "Scattered-Clouds-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png":
      "Broken-Clouds-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png":
      "Broken-Clouds-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/shower-rain-day.png":
      "Shower-Rain-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/shower-rain-night.png":
      "Shower-Rain-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png":
      "Rain-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-night.png":
      "Rain-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/thunderstorm-day.png":
      "Thunderstorm-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/thunderstorm-night.png":
      "Thunderstorm-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/snow-day.png":
      "Snow-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/snow-night.png":
      "Snow-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-day.png":
      "Mist-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-night.png":
      "Mist-Night.png",
  };

  if (iconUrl in iconMapping) {
    const filename = iconMapping[iconUrl];
    iconElement.src = "assets/" + filename;
    iconElement.alt = filename.replace(".png", "");
  } else {
    iconElement.src = iconUrl;
    iconElement.alt = "Original Icon";
  }
}

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = capitalizeWords(
    response.data.condition.description
  );
  updateIcon(response);

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  temperatureElement.innerHTML = Math.round(temperature);

  let roundedWindSpeed = Math.round(response.data.wind.speed);
  windSpeedElement.innerHTML = `${roundedWindSpeed} mph`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  hours = hours % 12 || 12;
  let amPm = hours >= 12 ? "AM" : "PM";
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes} ${amPm}`;
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

function searchCity(city) {
  // Goal: Make API Call & Update UI
  // Note: Separation of Concerns
  let apiKey = "3oet065fc2868d480dfba1d0d3a951b0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "3oet065fc2868d480dfba1d0d3a951b0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function updateForecastIcon(iconUrl) {
  const forecastIconMapping = {
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png":
      "Clear-Sky-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-night.png":
      "Clear-Sky-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png":
      "Few-Clouds-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-night.png":
      "Few-Clouds-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png":
      "Scattered-Clouds-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-night.png":
      "Scattered-Clouds-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png":
      "Broken-Clouds-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png":
      "Broken-Clouds-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/shower-rain-day.png":
      "Shower-Rain-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/shower-rain-night.png":
      "Shower-Rain-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png":
      "Rain-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-night.png":
      "Rain-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/thunderstorm-day.png":
      "Thunderstorm-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/thunderstorm-night.png":
      "Thunderstorm-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/snow-day.png":
      "Snow-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/snow-night.png":
      "Snow-Night.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-day.png":
      "Mist-Day.png",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-night.png":
      "Mist-Night.png",
  };

  return forecastIconMapping[iconUrl] || "Original Icon";
}

function displayForecast(response) {
  let forecastHtml = "";
  let forecastSummaryElement = document.querySelector("#forecast-summary");

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      const iconUrl = day.condition.icon_url;
      const filename = updateForecastIcon(iconUrl);

      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div class="weather-forecast-icon">
        <img src="assets/${filename}" width="50" class="weather-forecast-icon-image" /></div>
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round(
          day.temperature.maximum
        )}&deg;</span>
        <span class="weather-forecast-temperature-min">${Math.round(
          day.temperature.minimum
        )}&deg;</span>
      </div>
    </div>`;
    }
  });

  forecastSummaryElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("San Francisco");
