// // Map initialization 
// var map = L.map('map').setView([29.8660,  77.8905], 20);


// // Approximate location Vigyan Kunj
// var centerLat = 29.86220298700757;
// var centerLng = 77.90025148577993;

// // Creating a bounding box
// var southWest = [centerLat - 0.0001, centerLng - 0.0001];
// var northEast = [centerLat + 0.0001, centerLng + 0.0001];
// var bounds = [southWest, northEast];

// var rectangle = L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
// map.fitBounds(rectangle.getBounds());


// //osm layer
// var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// osm.addTo(map);

//   if(!navigator.geolocation) {
//     console.log("Your browser doesn't support geolocation feature!")
//     } 
//   else {
//       setInterval(() => {
//         navigator.geolocation.getCurrentPosition(getPosition)
//       }, 500); // miliseconds update 
//     }

// var marker, circle;

// function getPosition(position){
//         // console.log(position)
//       var lat = position.coords.latitude
//       var long = position.coords.longitude
//       var accuracy = position.coords.accuracy // Accuracy in terms of meters

//       if(marker) { // Red colored Marker to point your location
//           map.removeLayer(marker)
//       }

//       if(circle) { // Circle around your geo location
//         map.removeLayer(circle)
//       }

//       marker = L.marker([lat, long])
//       circle = L.circle([lat, long], {radius: accuracy})

//       var featureGroup = L.featureGroup([marker, circle]).addTo(map)

//       map.fitBounds(featureGroup.getBounds())

//     // Function to calculate distance between two lat/long pairs
//     function calculateDistance(lat1, long1, lat2, long2) {
//       // Radius of the Earth in meters
//       var R = 6371000;
//       var dLat = (lat2 - lat1) * Math.PI / 180;
//       var dLong = (long2 - long1) * Math.PI / 180;
//       var a = 
//           Math.sin(dLat/2) * Math.sin(dLat/2) +
//           Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//           Math.sin(dLong/2) * Math.sin(dLong/2);
//       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//       var distance = R * c;
//       return distance;
//     }

//     // Check if current position (with accuracy) overlaps the bounding box
//     // Simplified check: if distance to any corner <= accuracy, consider it overlapping
//     var corners = [southWest, [southWest[0], northEast[1]], northEast, [northEast[0], southWest[1]]];
//     var overlaps = corners.some(corner => {
//         return calculateDistance(lat, long, corner[0], corner[1]) <= accuracy;
//     });

//   if (overlaps) {
//       console.log("Near the target location within accuracy range!");
//   }
//       console.log("Your coordinate is: Lat: "+ lat +" Long: "+ long+ " Accuracy: "+ accuracy)
// }

// // Define the showNotification function
// function showNotification(title, options) {
//   if (!("Notification" in window)) {
//       console.error("This browser does not support desktop notification");
//   } else if (Notification.permission === "granted") {
//       new Notification(title, options);
//   } else if (Notification.permission !== "denied") {
//       Notification.requestPermission().then(function (permission) {
//           if (permission === "granted") {
//               new Notification(title, options);
//           }
//       });
//   }
// }




// Map initialization 
var map = L.map('map').setView([29.8660,  77.8905], 20);

var centerLat = 29.86220298700757;
var centerLng = 77.90025148577993;

var southWest = [centerLat - 0.0001, centerLng - 0.0001];
var northEast = [centerLat + 0.0001, centerLng + 0.0001];
var bounds = [southWest, northEast];

var rectangle = L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
map.fitBounds(rectangle.getBounds());

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(map);

if (!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 500); // milliseconds update 
}

var marker, circle;

function getPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var accuracy = position.coords.accuracy; // Accuracy in terms of meters

    if (marker) { 
        map.removeLayer(marker);
    }

    if (circle) { 
        map.removeLayer(circle);
    }

    marker = L.marker([lat, long]);
    circle = L.circle([lat, long], {radius: accuracy});

    var featureGroup = L.featureGroup([marker, circle]).addTo(map);

    map.fitBounds(featureGroup.getBounds());

    var corners = [southWest, [southWest[0], northEast[1]], northEast, [northEast[0], southWest[1]]];
    var overlaps = corners.some(corner => {
        return calculateDistance(lat, long, corner[0], corner[1]) <= accuracy;
    });

    if (overlaps) {
        console.log("Near the target location within accuracy range!");
        showNotification("Vigyan Kunj Reached", {
            body: "You are close to your destination location!",
        });
    }
    console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy);
}

// Function to calculate distance between two lat/long pairs
function calculateDistance(lat1, long1, lat2, long2) {
    var R = 6371000;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLong = (long2 - long1) * Math.PI / 180;
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = R * c;
    return distance;
}

// Define the showNotification function
function showNotification(title, options) {
    if ('Notification' in window) {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                var notification = new Notification(title, options);
            }
        });
    }
}
