
let mapToken= mapToken;
mapboxgl.accessToken = mapToken ;
  const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
      center: [-2.81361, 36.77271], // starting position [lng, lat]
      zoom: 13 // starting zoom
  });

  const layerList = document.getElementById('menu');
  const inputs = layerList.getElementsByTagName('input');

  for (const input of inputs) {
      input.onclick = (layer) => {
          const layerId = layer.target.id;
          map.setStyle('mapbox://styles/mapbox/' + layerId);
      };
  }
