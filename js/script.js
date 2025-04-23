const input = document.getElementById('location-input');

let currLocation = {
    type: null,
    value: null
};
let inputLocation = {
    type: null,
    value: null
};

function dateFormatter() {
    const date = new Date('2025-04-23');
    const dateEl = document.querySelector('.location-widget__date');
    const smallDateEl = document.querySelector('.weather-widget__date');

    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };

    const smallOpts = {
        weekday: 'long',
        day: '2-digit'
    };

    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    const smallFormattedDate = new Intl.DateTimeFormat('en-GB', smallOpts).format(date);
    dateEl.innerText = formattedDate;
    smallDateEl.innerText = smallFormattedDate;
}

function getCurrentLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            currLocation = {
                type: 'coords',
                value: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }
            };
            console.log(currLocation);
            fetchWeatherData(currLocation);
        }, (error) => {
            console.error('Geolocation error:', error.message);
            setRandomCity();
        });
    } else {
        setRandomCity();
    }
}

function setRandomCity() {
    const cities = [
        'New York',
        'London',
        'Tokyo',
        'Paris',
        'Dubai',
        'Sydney',
        'Toronto',
        'Cape Town',
        'Berlin',
        'Singapore',
        'São Paulo',
        'Bangkok',
        'Moscow',
        'Mexico City',
        'Rome',
        'Istanbul',
        'Seoul',
        'Los Angeles',
        'Mumbai',
        'Buenos Aires'
    ];

    const randomIndex = Math.floor(Math.random() * cities.length);
    fetchWeatherData(currLocation = {
        type: 'city',
        value: cities[randomIndex]
    });
}

function enterInput(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const city = input.value.toLowerCase().trim();
        if (city) {
            inputLocation = {
                type: 'city',
                value: city
            };
            console.log(inputLocation);
            fetchWeatherData(inputLocation);
        } else {
            alert("Please enter a city")
        }
    }
};

function updateUI(data) {
    let cityEl = document.querySelector('.location-widget__city');
    let tempEl = document.querySelector('.weather-widget__value');
    let iconEl = document.querySelector('.weather-widget__icon');
    let descriptionEl = document.querySelector('.weather-widget__label');
    let humidityEl = document.querySelector('.detail-item__humidity');
    let windEl = document.querySelector('.detail-item__wind');
    let feelsLikeEl = document.querySelector('.detail-item__feels');


    cityEl.innerText = `${data.city}, ${data.country}`;
    tempEl.innerText = `${data.temperature.toFixed(1)}°`;
    iconEl.setAttribute('src', `https://openweathermap.org/img/wn/${data.icon}@2x.png`);
    descriptionEl.innerText = `${data.main}`;
    humidityEl.innerText = `${data.humidity}%`;
    windEl.innerText = `${data.windSpeed} mph`;
    feelsLikeEl.innerText = `${data.feelsLike.toFixed(1)}°`;
}

async function fetchWeatherData(location) {
    try {
        const res = await fetch('/api/weather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(location)
        });

        if (!res.ok) throw new Error('Network response was not ok');

        const data = await res.json();
        console.log(data);
        updateUI(data); // Update your HTML elements
    } catch (err) {
        console.error('Error fetching weather data:', err);
    }
}


input.addEventListener('keydown', enterInput);
window.addEventListener('DOMContentLoaded', getCurrentLocation);
window.addEventListener('DOMContentLoaded', dateFormatter);
