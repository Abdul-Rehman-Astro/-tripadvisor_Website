function upload() {
    var lat = document.getElementById('latitude').value;
    var long = document.getElementById('longitude').value;
    // Add functionality to use these coordinates to display location on map or other purposes
    alert('Latitude: ' + lat + ', Longitude: ' + long);
 }

 // Initialize the map after the document loads
document.addEventListener('DOMContentLoaded', function() {

    // Replace with your desired center coordinates (latitude, longitude)
    var map = L.map('map').setView([51.505, -0.09], 13); 

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

});


  // Initialize the map after the document loads
document.addEventListener('DOMContentLoaded', function() {

    // Replace with your desired center coordinates (latitude, longitude)
    var map = L.map('map').setView([51.505, -0.09], 13); 

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add event listener to submit button (within DOMContentLoaded)
    document.getElementById("upload").addEventListener("click", updateMap);
});

// Function to update map center based on user input
function updateMap() {
  var latitude = parseFloat(document.getElementById("latitude").value);
  var longitude = parseFloat(document.getElementById("longitude").value);

  // Check if valid coordinates are entered
  if (isNaN(latitude) || isNaN(longitude)) {
    alert("Please enter valid latitude and longitude values.");
    return;
  }

  // Update map center
  map.setView([latitude, longitude], 13); // Adjust zoom level as needed
}
