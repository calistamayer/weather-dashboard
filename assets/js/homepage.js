var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-search");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");

var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input element
    var searchedCity = cityInputEl.value.trim();

    if (searchedCity) {
        getLocalWeather(searchedCity);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};

var getLocalWeather = function (city) {
    // format the openweather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e5995b4238e07507fc0fbcd0113be3fe";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentWeather(data, city);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
        .catch(function (error) {
            alert("Unable to connect to OpenWeather API");
        });
};

var displayCurrentWeather = function (currentWeather, searchTerm) {
    // clear old content
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;

    // format city name
    var cityName = currentWeather.name

    // create a span element to hold city name
    var nameEl = document.createElement("div");
    nameEl.textContent = `${cityName}: `;

    // format current conditions
    var currentConditions = `${currentWeather.weather[0].main} (${currentWeather.weather[0].description})`;

    // create conditions element
    var conditionsEl = document.createElement("div");
    conditionsEl.classList = "lead";
    conditionsEl.textContent = currentConditions;

    var tempEl = document.createElement("p");
    var currentTemp = (((9/5)*(currentWeather.main.temp-273))+32).toFixed(1);
    tempEl.classList = "small";
    tempEl.textContent = `Current temperature is ${currentTemp} degrees (F)`;

    var humidityEl = document.createElement("p");
    var humidity = currentWeather.main.humidity;
    humidityEl.classList = "small";
    humidityEl.textContent = `${humidity}% humidity`;

    var windEl = document.createElement("p");
    var windSpeed = currentWeather.wind.speed;
    windEl.classList = "small";
    windEl.textContent = `Current wind speed is ${windSpeed} meters/second`;

    // append to container
    weatherContainerEl.appendChild(nameEl);
    weatherContainerEl.appendChild(conditionsEl);
    weatherContainerEl.appendChild(tempEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(windEl);
};

cityFormEl.addEventListener("submit", formSubmitHandler);