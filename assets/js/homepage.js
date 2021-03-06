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
    var nameEl = document.createElement("span");
    nameEl.textContent = `${cityName}: `;

    // format current conditions
    var currentConditions = `${currentWeather.weather[0].main} (${currentWeather.weather[0].description})`;

    // create conditions element
    var conditionsEl = document.createElement("span");
    conditionsEl.classList = "lead";
    conditionsEl.textContent = currentConditions;

    // append to container
    weatherContainerEl.appendChild(nameEl);
    weatherContainerEl.appendChild(conditionsEl);
};

cityFormEl.addEventListener("submit", formSubmitHandler);