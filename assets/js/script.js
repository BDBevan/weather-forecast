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
            displayCurrentWeather(data);
            displayForecast(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayCurrentWeather(data) {
    const currentWeather = data.list[0];
    const details = `
        <p>City: ${data.city.name}</p>
        <p>Date: ${new Date(currentWeather.dt_txt).toLocaleDateString()}</p>
        <p><img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png" alt="Weather icon"></p>
        <p>Temperature: ${currentWeather.main.temp} °C</p>
        <p>Humidity: ${currentWeather.main.humidity} %</p>
        <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
    `;
    document.getElementById('current-weather-details').innerHTML = details;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const forecast = data.list[i * 8]; // 8 entries per day (3-hour interval)
        const forecastItem = document.createElement('div');
        forecastItem.innerHTML = `
            <p>Date: ${new Date(forecast.dt_txt).toLocaleDateString()}</p>
            <p><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon"></p>
            <p>Temperature: ${forecast.main.temp} °C</p>
            <p>Humidity: ${forecast.main.humidity} %</p>
            <p>Wind Speed: ${forecast.wind.speed} m/s</p>
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
