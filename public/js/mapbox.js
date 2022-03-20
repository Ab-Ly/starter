/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibmFjaGlrZXRhLWRoYWwiLCJhIjoiY2tqeHY3YnM3MDQxaTJwbXE1czVuYTJ3YyJ9.RrYbOpBmYzvacTxj-iIBBw';

  var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/nachiketa-dhal/ckjxvq1nu26io17moxyww3acv', // style URL
    scrollZoom: false,
    //     //   center: [-118.113491, 34.111745], // starting position [lng, lat]
    //     //   zoom: 9, // starting zoom
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    // add a marker
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // add a popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
