mapboxgl.accessToken = API_KEY;

var map = new mapboxgl.Map({
  container: 'map3', // container element id
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-87.6298, 41.8781], // initial map center in [lon, lat]
  zoom: 12
});

map.on('load', function() {
  map.addLayer({
    id: 'accidents',
    type: 'circle',
    source: {
      type: 'geojson',
      data: 'accidents_2020.geojson' // replace this with the url of your own geojson
    },
    paint: {

      'circle-color': [
        'interpolate',
        ['linear'],
        ['number', ['get', 'month']],
        0, '#2DC4B2',
        1, '#3BB3C3',
        2, '#669EC4',
        3, '#8B88B6',
        4, '#A2719B',
        5, '#AA5E79'
      ],
      'circle-opacity': 0.8
    }
  });

  document.getElementById('slider').addEventListener('input', function(e) {
    var month = parseInt(e.target.value,11);
    // update the map
    map.setFilter('accidents', ['==', ['number', ['get', 'month']], month]);

  
    // update text in the UI
    document.getElementById('active-hour').innerText = month;
  });

  });