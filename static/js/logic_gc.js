var container = L.DomUtil.get('map2');
      if(container != null){
        container._leaflet_id = null;
      }

function createMap(darkBaseMap) {
  // Adding tile layer
  var darkBaseMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10"/*"vrohm/ckg12jke42t8m19qmb4ansbby"*/,
    accessToken: API_KEY
  });

  // LAYER CONTROL
  // Only one base layer can be shown at a time
  var baseMaps = {
    "Chicago": darkBaseMap,
  };

  // Overlays that may be toggled on or off
  var overlayMaps = {
    "Crashes": crashes,
    "Neighborhood Border": chiAreas
  };


  // Creating map object
  var container = L.DomUtil.get('map2'); if(container != null){ container._leaflet_id = null; }
  var myMap = L.map("map2", {
    center: [41.8705496, -87.6239202],
    //pitch: 9.76,
    zoom: 13,
    layers: [darkBaseMap]
  });
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Create a legend to display information about our map
  var info = L.control({
    position: "bottomright"
  });

  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend")
    // depth = ["Crashes", "FREEZING RAIN-DRIZZLE", "CLEAR", "SNOW", "BLOWING SNOW"]
    // labels = ["Crashes", "FREEZING RAIN-DRIZZLE", "CLEAR", "SNOW", "BLOWING SNOW"];
    div.innerHTML += "<h4>2019 Crashes</h4>"
    div.innerHTML += '<i style="background: #BA738B"></i><span>CRASHES</span><br>';
    div.innerHTML += '<i style="background: #E54E8D"></i><span>FREEZING RAIN-DRIZZLE</span><br>';
    div.innerHTML += '<i style="background: #EEBD70"></i><span>CLEAR</span><br>';
    div.innerHTML += '<i style="background: #27016E"></i><span>SNOW</span><br>';
    div.innerHTML += '<i style="background: #009A9F"></i><span>BLOWING SNOW</span><br>';

    return div;
  };
  // Add the info legend to the map
  info.addTo(myMap);

}

// **** CHICAGO AREA MAP LINES ****
// Use this link to get the geojson data chicago area map.
var chiMap = "static/data/chicago-community-areas.geojson";
// console.log(chiMap);
var chiAreas; 
// Grabbing our GeoJSON data..
d3.json(chiMap, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  mapFeatures(data.features);
});

function mapFeatures(geojson) {
  // Creating a geoJSON layer with the retrieved data
  chiAreas = L.geoJson(geojson, {
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
      layer.on("mouseover", function (event) {
        layer = event.target;
        coordinate(event);
        layer.setStyle({
          fillOpacity: 0.2
      });
    });
      layer.on("mouseout", function (event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.2
      });
    });
      layer.on("click", function (event) {
        myMap.fitBounds(event.target.getBounds());
      });
    

      // layer.on({
      //   // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
      //   mouseover: function(event) {
      //     layer = event.target;
      //     layer.setStyle({
      //       fillOpacity: 0.9
      //     });
      //   },
      //   // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
      //   mouseout: function(event) {
          // layer = event.target;
          // layer.setStyle({
          //   fillOpacity: 0.2
      //     });
      //   },
      //   // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
      //   click: function(event) {
      //     myMap.fitBounds(event.target.getBounds());
      //   }
      // });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.community + "</h1> <hr>" + "<h2>" + "Chicago Area" + "</h2>" + "<h2>" + feature.properties.area_numbe + "</h2>");
     
    }
 });
 createMap(chiAreas);
}


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
    return "#E54E8D"
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
var crashes;      
// Perform a GET request to the query URL

d3.json(chiCrashes, function(data) {
  crashFeatures(data.features);
});
  
// ****** WHERE THE CRASH CIRCLES ARE CREATED!!****
function crashFeatures(crashdata) {
  
  crashes = L.geoJSON(crashdata, {
    onEachFeature: function (feature, layer) {
    
     
      // Setting the marker radius for the city by passing population into the markerSize function
      
      layer.bindPopup("<h3>" + feature.properties.f +
        "</h3><hr><p>" + new Date(feature.properties.c) + "<hr>" + "<h3>" + "Fatalities" + "</h3>" + feature.properties.i + "<hr>" + "<h3>" + "Weather Conditon" + "</h3>" + feature.properties.w + "</p>");
    },
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius: .3 /*(geoJsonPoint.properties.mag * 3)*/,
        color: getValue(feature.properties.w),
        opacity: .6,
        fillOpacity: .3
      });
    }
  });
  createMap(crashes)
}