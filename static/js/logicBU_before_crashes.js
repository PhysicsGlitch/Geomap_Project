// Creating map object
var myMap = L.map("map", {
  center: [41.787, -87.672],
  //pitch: 9.76,
  zoom: 10
});

// Adding tile layer

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "vrohm/ckg12jke42t8m19qmb4ansbby",
  accessToken: API_KEY
}).addTo(myMap);


// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(area) {
  switch (area) {
  case "Brooklyn":
    return "yellow";
  case "Bronx":
    return "red";
  case "Manhattan":
    return "orange";
  case "Queens":
    return "green";
  case "Staten Island":
    return "purple";
  default:
    return "black";
  }
}


// Use this link to get the geojson data.
var link = "static/data/chicago-community-areas.geojson";
console.log(link);

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "blue",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: 'purple',
        fillOpacity: 0.2,
        weight: 1
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.2
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.community + "</h1> <hr>" + "<h2>" + "Chicago Area" + "</h2>" + "<h2>" + feature.properties.area_numbe + "</h2>");

    }
  }).addTo(myMap);
});

//**********//
// ADD CRASHES DATA HERE ** SIMILAR TO EARTHQAUKE MAP FROM LEAFLET PROJECT

// Store our geojson inside crashes
var chiCrashes = "../data/crashes_in_2019.geojson";
      
// Perform a GET request to the query URL
d3.json(chiCrashes, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

// ACTUALLY BUILDING THE MAP FROM THE ABOVE FUNCTIONS
function createFeatures(geojson) {
  

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data 
  // ****** WHERE THE CIRCLES ARE CREATED!!****
  var crashes = L.geoJSON(geojson, {
    onEachFeature: function (feature, layer) {
      // Setting the marker radius for the city by passing population into the markerSize function
      
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "<hr>" + "<h3>" + "Magnitude" + "</h3>" + feature.properties.mag + "<hr>" + "<h3>" + "Depth (km)" + "</h3>" + feature.geometry.coordinates[2] + "</p>");
    },
    pointToLayer: function(geoJsonPoint, latlng) {
      return new L.CircleMarker(latlng, {
        radius: 20 /*(geoJsonPoint.properties.mag * 3)*/,
        color: getValue(geoJsonPoint.geometry.coordinates[2]),
        opacity: 1,
        fillOpacity: .7
      });
    }
  });
  

  // Sending our chiCrashes layer to the createMap function
  createMap(crashes);
}