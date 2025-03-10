const apiKey = 'b2d49511-24c9-4196-9d25-5759c8a7dd88'; 
    
// Event listener for form submit
document.getElementById("submit-btn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission and page reload

    var lat = parseFloat(document.getElementById("eletric-lat").value);
    var lon = parseFloat(document.getElementById("eletric-lon").value);
    var maxResults = parseInt(document.getElementById("max-results").value);

    // Ensure the inputs are valid numbers
    if (isNaN(lat) || isNaN(lon) || isNaN(maxResults)) {
        alert("Please enter valid numbers for latitude, longitude, and max results.");
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var resp = JSON.parse(this.responseText);
            processRequest(resp);
        }
    }

    //https://api.openchargemap.io/v3/poi?output=json&latitude=38.72225&longitude=-9.13934&maxresults=1&key=b2d49511-24c9-4196-9d25-5759c8a7dd88
    const url = `https://api.openchargemap.io/v3/poi?output=json&latitude=${lat}&longitude=${lon}&maxresults=${maxResults}&key=${apiKey}`;
    xhttp.open("GET", url, true)
    xhttp.send();
});

function processRequest(resp){
    var i, country, lat, lon, address;
    var tbody = document.getElementById("tbody");

    tbody.innerHTML = "";
    mymap.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            mymap.removeLayer(layer); // Remove existing markers
        }
    });

    for(i = 0; i < resp.length; i++){   
        country = resp[i]["AddressInfo"]["Country"]["ISOCode"];
        lat = resp[i]["AddressInfo"]["Latitude"];
        lon = resp[i]["AddressInfo"]["Longitude"];
        address = resp[i]["AddressInfo"]["AddressLine1"];

        addLine(tbody, country, lat, lon, address);
        addMarkerToMap(lat, lon, address);
    }
}

function addLine(tableBody, country, lat, lon, address){
    var row = tableBody.insertRow();
    row.insertCell(0).innerHTML = country;
    row.insertCell(1).innerHTML = lat;
    row.insertCell(2).innerHTML = lon;
    row.insertCell(3).innerHTML = address;
}

// Initialize the map and set the default position and zoom
var mymap = L.map('myMap').setView([38.72225, -9.13934], 13); // Default to Lisbon, you can change the initial view

// Set the tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

function addMarkerToMap(lat, lon, address) {
    // Adiciona o marcador ao mapa
    var marker = L.marker([lat, lon]).bindPopup(`<b>${address}</b>`).addTo(mymap);

    // Muda a posição do mapa para o local do marcador e ajusta o zoom
    mymap.setView([lat, lon], 15); // 15 é o nível de zoom, você pode ajustá-lo conforme necessário
}

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById('eletric-lat').value = position.coords.latitude;
            document.getElementById('eletric-lon').value = position.coords.longitude;
        },  function(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("You denied geolocation permission request. Please allow geolocation to use this feature.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Your current position is unavailable. Try again.");
                    break;
                case error.TIMEOUT:
                    alert("Request to get your location has timed out. Try again.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred. Try again.");
                    break;
            }
        }
    );
} else {
    alert("Your browser does not support geolocation. Please use a different browser to use this feature.");
}
}

document.getElementById('getLocationButton').addEventListener('click', getGeolocation);