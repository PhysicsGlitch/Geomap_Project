// Adding tile layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: MAP_API_KEY
})

 var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: MAP_API_KEY
  });

var fatality = L.layerGroup();

d3.json("static/data/fatalities.json", function(data) {
    const lat = Object.values(data.latitude);
    const long = Object.values(data.longitude);
     for (var i = 0; i < lat.length; i++) {
      L.marker([lat[i], long[i]]).addTo(fatality);
    }
});

var myMap = L.map("map", {
  center: [41.8, -87.6],
  zoom: 13,
    layers: [streetmap, fatality]
});


var hit_run_2020 = L.layerGroup();
d3.json("static/data/hit_n_run_2020.json", function(data) {
    
    var heatArray = [];
    const lat = Object.values(data.latitude);
    const long = Object.values(data.longitude);
    for (var i = 0; i < lat.length; i++) {
       heatArray.push([lat[i], long[i]]);
    };
  
  var heat = L.heatLayer(heatArray, {
    radius: 15,
    blur: 30
  }).addTo(hit_run_2020);
});

var hit_run_2019 = L.layerGroup();
d3.json("static/data/hit_n_run_2019.json", function(data) {
    
    var heatArray = [];
    const lat = Object.values(data.latitude);
    const long = Object.values(data.longitude);
    for (var i = 0; i < lat.length; i++) {
       heatArray.push([lat[i], long[i]]);
    };
  
  var heat = L.heatLayer(heatArray, {
    radius: 15,
    blur: 30
  }).addTo(hit_run_2019);
});

var hit_run_2018 = L.layerGroup();
d3.json("static/data/hit_n_run_2018.json", function(data) {
    
    var heatArray = [];
    const lat = Object.values(data.latitude);
    const long = Object.values(data.longitude);
    for (var i = 0; i < lat.length; i++) {
       heatArray.push([lat[i], long[i]]);
    };
  
  var heat = L.heatLayer(heatArray, {
    radius: 15,
    blur: 30
  }).addTo(hit_run_2018);
});

var baseMaps = {
     "Street Map": streetmap,
    "Dark Map": darkmap
  };

    //Define overlay maps

var overlayMaps = {
  "Fatalities": fatality,
    "Hit and Runs 2020": hit_run_2020,
    "Hit and Runs 2019": hit_run_2019,
    "Hit and Runs 2018": hit_run_2018
 };

// This final line just adds my base maps and overlaymaps to the final plot
L.control.layers(baseMaps, overlayMaps).addTo(myMap);