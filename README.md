# Weather App - Frontend (MVP)

## Overview
This directory contains the frontend code for the Weather App MVP. It provides a user interface built with HTML, CSS, and vanilla JavaScript to display weather information fetched from the corresponding backend service. Users can view weather details for their current location (via browser geolocation) or search for weather in specific cities. The application features a dynamic background image related to the displayed location, sourced via the backend from Unsplash.

## Features (MVP)
*   **Geolocation:** Attempts to fetch weather for the user's current location on initial load.
*   **City Search:** Allows users to input a city name to fetch and display its weather forecast.
*   **Current Weather Display:** Shows temperature, weather condition (main description and icon), humidity, wind speed, and "feels like" temperature.
*   **Dynamic Background:** Displays a relevant landscape background image from Unsplash based on the current city/country.
*   **Date Display:** Shows the current date in a user-friendly format.
*   **Responsive Design:** Adapts layout for various screen sizes (desktop, tablet, mobile).
*   **Image Attribution:** Displays attribution for the background image source as required by Unsplash.

## Technology Stack
*   HTML5
*   CSS3 (including CSS Variables, Flexbox, Grid)
*   JavaScript (Vanilla ES6+)
*   Font Awesome (for icons)
*   Google Fonts (Quicksand)

## Prerequisites
*   A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
*   The [Weather App Backend](<link_to_backend_repo_or_directory_if_monorepo>) must be running, as this frontend relies on its API.

## Setup and Running
This frontend is composed of static files (HTML, CSS, JS) that are typically served directly by the Weather App Backend service.

1.  **Ensure the Backend is Running:** Follow the setup instructions in the backend's README to start the server (usually on `http://localhost:5500` by default).
2.  **Access the Application:** Open your web browser and navigate to the URL where the backend server is running (e.g., `http://localhost:5500`). The backend server should automatically serve the `index.html` file from this frontend directory.

There are no separate build steps or installation commands required specifically for this frontend part for the MVP stage.

## Backend API Interaction
The frontend communicates with the backend service via the following endpoint:

*   **Endpoint:** `/api/weather`
*   **Method:** `POST`
*   **Description:** Sends the location type (`city` or `coords`) and value (city name or latitude/longitude object) to the backend. Receives structured weather and image data in response.

*(Refer to the Backend README for detailed API specifications)*

## License

MIT License