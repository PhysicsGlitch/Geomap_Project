
// Creating map object
var myMap = L.map("map", {
  center: [41.8705496, -87.6239202],
  //pitch: 9.76,
  zoom: 12
});

// Adding tile layer

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10"/*"vrohm/ckg12jke42t8m19qmb4ansbby"*/,
  accessToken: API_KEY
}).addTo(myMap);


// **** CHICAGO AREA MAP LINES ****
// Use this link to get the geojson data chicago area map.
var link = "static/data/chicago-community-areas.geojson";
console.log(link);

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "purple",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: 'grey',
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
// COLORS FOR THE FEATURES AND LEGEND
function getValue(x) {
  if (x === "BLOWING SNOW") {
    return "#009A9F"
  } else if (x === "SNOW") {
    return "#27016E"
  } else if (x === "CLEAR") {
    return "#EEBD70"
  } else if (x === "FREEZING RAIN\/DRIZZLE") {
    return "E54E8D"
  } else {
    return "#BA738B"
  }
  
}
// ADD CRASHES DATA HERE ** SIMILAR TO EARTHQAUKE MAP FROM LEAFLET PROJECT
/* 
minified geojson Key mapping:

  "c": "crash_date",
  "w": "weather_condition",
  "f": "first_crash_type",
  "t": "trafficway_type",
  "b": "Beat",
  "i": "injuries_fatal",
  "a": "crash_day_of_week",
  "l": "latitude",
  "d": "longitude"

*/
// Store our geojson inside crashes
var chiCrashes = "static/data/crashes_in_2019min.geojson";
      
// Perform a GET request to the query URL
d3.json(chiCrashes, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data 
  // ****** WHERE THE CIRCLES ARE CREATED!!****
  L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
      // Setting the marker radius for the city by passing population into the markerSize function
      
      layer.bindPopup("<h3>" + feature.properties.f +
        "</h3><hr><p>" + new Date(feature.properties.c) + "<hr>" + "<h3>" + "Fatalities" + "</h3>" + feature.properties.i + "<hr>" + "<h3>" + "Weather Conditon" + "</h3>" + feature.geometry.w+ "</p>");
    },
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius: .3 /*(geoJsonPoint.properties.mag * 3)*/,
        color: getValue(feature.properties.w),
        opacity: .2,
        fillOpacity: .3
      });
    }
  }).addTo(myMap);
});

var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'legend');
    labels = ['<strong>Weather</strong>'],
    categories = ['BLOWING SNOW','SNOW','CLEAR','FREEZING RAIN\/DRIZZLE','Other'];

    for (var i = 0; i < categories.length; i++) {
            div.innerHTML += 
            labels.push(
                '<i style="background:' + getColor(categories[i] + 1) + '"></i> ' +
                (categories[i] ? categories[i] : '+'));
        }

        div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(myMap);


  
