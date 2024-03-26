

function upload() {
    var lat = document.getElementById('latitude').value;
    var long = document.getElementById('longitude').value;
    // Add functionality to use these coordinates to display location on map or other purposes
    alert('Latitude: ' + lat + ', Longitude: ' + long);
 }



function beep(duration, frequency = 520, volume = 1, type = 'sine') {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.value = volume;
  oscillator.frequency.value = frequency;
  oscillator.type = type;

  oscillator.start();

  setTimeout(function() {
      oscillator.stop();
  }, duration);
}



// Initialize the map after the document loads
document.addEventListener('DOMContentLoaded', function() {

    // Replace with your desired center coordinates (latitude, longitude)
    var map = L.map('map').setView([29.8660,  77.8905], 13); 


    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add event listener to submit button (within DOMContentLoaded)
    document.getElementById("upload").addEventListener("click", updateMap);
});






// Map initialization 
var map = L.map('map').setView([29.8660,  77.8905], 20);


// Approximate location Vigyan Kunj
var centerLat = 29.86220298700757;
var centerLng = 77.90025148577993;

// Creating a bounding box
var southWest = [centerLat - 0.0001, centerLng - 0.0001];
var northEast = [centerLat + 0.0001, centerLng + 0.0001];
var bounds = [southWest, northEast];

var rectangle = L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
map.fitBounds(rectangle.getBounds());





//osm layer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(map);

  if(!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
    } 
  else {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
      }, 500); // miliseconds update 
    }

var marker, circle;

function getPosition(position){
        // console.log(position)
      var lat = position.coords.latitude
      var long = position.coords.longitude
      var accuracy = position.coords.accuracy // Accuracy in terms of meters

      if(marker) { // Red colored Marker to point your location
          map.removeLayer(marker)
      }

      if(circle) { // Circle around your geo location
        map.removeLayer(circle)
      }

      marker = L.marker([lat, long])
      circle = L.circle([lat, long], {radius: accuracy})

      var featureGroup = L.featureGroup([marker, circle]).addTo(map)

      map.fitBounds(featureGroup.getBounds())

      // Check if within target bounds (with some tolerance)
      if (lat > southWest[0] && lat < northEast[0] && long > southWest[1] && long < northEast[1]) {
        beep(10000); // Beep for 200 milliseconds
        console.log("You've reached the target location!");
      }

      console.log("Your coordinate is: Lat: "+ lat +" Long: "+ long+ " Accuracy: "+ accuracy)
}