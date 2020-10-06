var myMap = L.map("map", {
  center: [41.8, -87.6],
  zoom: 13
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: MAP_API_KEY
}).addTo(myMap);


// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: MAP_API_KEY
}).addTo(myMap);


//var newtry = "https://data.cityofchicago.org/resource/85ca-t3if.json?$$app_token={CHI_API_KEY}$limit=2000";

$.ajax({
    url: "https://data.cityofchicago.org/resource/85ca-t3if.json",
    type: "GET",
    data: {
      "$limit" : 1500,
      "$$app_token" : CHI_API_KEY
    }
}).done(function(response) {
  alert("Retrieved " + response.length + " records from the dataset!");
  console.log(response);


//d3.json(newtry, function(response) {

  //console.log(response);
  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;
    if (location) {
      L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
    }
  }
});