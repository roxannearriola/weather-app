function changeCity(event) {
	event.preventDefault();
	let cityInput = document.querySelector("#city-text-input");
	let currentCity = document.querySelector("#city");
	currentCity.innerHTML = cityInput.value;

	let city = cityInput.value;
	let apiKey = "b511e89f29c4deb143d80dc884ca0735";
	let units = "metric";
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

	axios.get(url).then(changeTemperature);
}

function changeTemperature(response) {
	let temperature = Math.round(response.data.main.temp);
	let currentTemperature = document.querySelector("#temp-today");
	currentTemperature.innerHTML = temperature;

	let description = response.data.weather[0].description;
	let currentDescription = document.querySelector("#temp-description");
	currentDescription.innerHTML = description;
}

function getLocation() {
	navigator.geolocation.getCurrentPosition(handleCurrentPosition);
}

function handleCurrentPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;

	let apiKey = "b511e89f29c4deb143d80dc884ca0735";
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

	axios.get(apiUrl).then(changeCurrentCityDetails);
}

function changeCurrentCityDetails(response) {
	let temperature = Math.round(response.data.main.temp);
	let currentTemperature = document.querySelector("#temp-today");
	currentTemperature.innerHTML = temperature;

	let description = response.data.weather[0].description;
	let currentDescription = document.querySelector("#temp-description");
	currentDescription.innerHTML = description;

	let currentCity = document.querySelector("#city");
	currentCity.innerHTML = response.data.name;
}

let now = new Date();

let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let currentDay = days[now.getDay()];

let day = document.querySelector("#today-day");
day.innerHTML = currentDay;

let currentHour = now.getHours();
if (currentHour < 10) {
	currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
	currentMinutes = `0${currentMinutes}`;
}
let currentTime = `${currentHour}:${currentMinutes}`;

let time = document.querySelector("#today-time");
time.innerHTML = currentTime;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);
