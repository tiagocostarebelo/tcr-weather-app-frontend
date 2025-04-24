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
    const date = new Date();
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
};

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
            fetchData(currLocation);
        }, (error) => {
            console.error('Geolocation error:', error.message);
            setRandomCity();
        });
    } else {
        setRandomCity();
    }
};

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
    fetchData(currLocation = {
        type: 'city',
        value: cities[randomIndex]
    });
};

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
            fetchData(inputLocation);
        } else {
            console.error('Please enter a city');
        }

        input.value = '';
    }
};

function updateUI({ weather, image }) {
    const rootEl = document.documentElement;
    const cityEl = document.querySelector('.location-widget__city');
    const tempEl = document.querySelector('.weather-widget__value');
    const iconEl = document.querySelector('.weather-widget__icon');
    const descriptionEl = document.querySelector('.weather-widget__label');
    const humidityEl = document.querySelector('.detail-item__humidity');
    const windEl = document.querySelector('.detail-item__wind');
    const feelsLikeEl = document.querySelector('.detail-item__feels');
    const photoAuthor = document.querySelector('.unsplash-author');


    rootEl.style.setProperty('--background-image', `url(${image.unsplashImageUrl})`)
    cityEl.innerText = `${weather.city}, ${weather.country}`;
    tempEl.innerText = `${weather.temperature.toFixed(1)}°`;
    iconEl.setAttribute('src', `https://openweathermap.org/img/wn/${weather.icon}@2x.png`);
    descriptionEl.innerText = `${weather.main}`;
    humidityEl.innerText = `${weather.humidity}%`;
    windEl.innerText = `${weather.windSpeed} mph`;
    feelsLikeEl.innerText = `${weather.feelsLike.toFixed(1)}°`;
    photoAuthor.innerText = `${image.name}`;
    photoAuthor.setAttribute('href', `${image.unsplash_link}`);
}

async function fetchData(location) {
    try {
        const backendDeployedUrl = 'https://weather-hub-sbb5.onrender.com/';
        const res = await fetch(`${backendDeployedUrl}/api/weather`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(location)
        });

        if (!res.ok) throw new Error('Network response was not ok');

        const data = await res.json();
        // console.log(data);
        updateUI(data); // Update your HTML elements
    } catch (err) {
        console.error('Error fetching weather data:', err);
    }
}


input.addEventListener('keydown', enterInput);
window.addEventListener('DOMContentLoaded', getCurrentLocation);
window.addEventListener('DOMContentLoaded', dateFormatter);
