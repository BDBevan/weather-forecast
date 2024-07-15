document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherData(city);
        addCityToHistory(city);
        document.getElementById('city-input').value = '';
    }
});

function getWeatherData(city) {
    const apiKey = '9b8ea9ef76c82cacb1daf053f59638e3';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(city, data);
            displayForecast(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayCurrentWeather(city, data) {
    const currentWeather = data.list[0];
    const currentDate = new Date(currentWeather.dt_txt).toLocaleDateString();
    const details = `
        <p>Temperature: ${currentWeather.main.temp} °C</p>
        <p>Wind: ${currentWeather.wind.speed} m/s</p>
        <p>Humidity: ${currentWeather.main.humidity} %</p>
    `;
    document.getElementById('current-city').textContent = `${city} (${currentDate})`;
    document.getElementById('current-weather-details').innerHTML = details;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const forecast = data.list[i * 6]; 
        const forecastItem = document.createElement('div');
        forecastItem.innerHTML = `
            <p>${new Date(forecast.dt_txt).toLocaleDateString()}</p>
            <p><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon"></p>
            <p>Temp: ${forecast.main.temp} °C</p>
            <p>Wind: ${forecast.wind.speed} m/s</p>
            <p>Humidity: ${forecast.main.humidity} %</p>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}

function addCityToHistory(city) {
    const historyList = document.getElementById('history-list');
    const historyItem = document.createElement('li');
    historyItem.textContent = city;
    historyItem.addEventListener('click', function() {
        getWeatherData(city);
    });
    historyList.appendChild(historyItem);
}
