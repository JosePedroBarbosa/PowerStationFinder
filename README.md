# Power Stations Finder

This project is a web application that allows users to search for electric vehicle charging stations based on their geographical location. The application uses the OpenChargeMap API to fetch information about nearby charging stations, and the map is displayed using the Leaflet.js library.

## Features

- Automatically retrieve the user's geographical location (latitude and longitude) via the browser's geolocation API.
- Search for nearby electric vehicle charging stations using the OpenChargeMap API.
- Display charging stations on an interactive map (using Leaflet.js).
- Show results in a table with detailed information about each station, such as country, latitude, longitude, and address.

## How to Use

1. Open the `index.html` file in a browser.
2. Enter the desired latitude and longitude manually, or click the "Get My Location" button to automatically get the browser's location.
3. Enter the maximum number of results you want to retrieve.
4. Click "Submit" to view the nearby charging stations on the map and in the table.

## Technologies Used

- **HTML/CSS**: For the structure and styling of the application.
- **JavaScript**: For the application's logic.
- **Leaflet.js**: For displaying the interactive map.
- **OpenChargeMap API**: For retrieving information about electric vehicle charging stations.
- **Geolocation (Browser API)**: For automatically retrieving the user's location.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/power-stations-finder.git
