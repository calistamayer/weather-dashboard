var getLocalWeather = function(city) {
    // format the openweather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e5995b4238e07507fc0fbcd0113be3fe";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getLocalWeather("san diego");