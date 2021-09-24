import train from './train.png';
import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf'



mapboxgl.accessToken = 'pk.eyJ1IjoiaG9zc2lpIiwiYSI6ImNra2sxeXVlbjI0cW4ydnF1bXM4eWdyd3YifQ.clb20iW-d2O_Aj5WRYwIiQ';

function App() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(8.5417);
  const [lat, setLat] = useState(47.3769); 
  const [zoom, setZoom] = useState(9);
  const [viewport, setViewport] = useState({
    width: '100%', height: 'calc(100vh - 162px)'});


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      const marker = new mapboxgl.Marker()
      marker.setLngLat([lng, lat])
      marker.addTo(map.current)

      const el = document.createElement('div');
      el.className = 'marker';
      new mapboxgl.Marker(el).setLngLat([8.4409, 47.2759]).addTo(map.current);

        map.current.addLayer({
          type: 'circle',
          paint: {
            'circle-radius': ['-', 2017, ['number', ['get', 'Constructi'], 2017]],
            'circle-opacity': 0.8,
            'circle-color': 'rgb(171, 72, 33)'
          }
        });
      
    });

    map.current.once('load', () => {
      map.current.resize();
    });
   

    //trying the maps
    map.current.on('load', () => {
    map.current.addSource('route', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': [
            [8.5417, 47.3769],
            [8.5416, 47.3768],
            [8.5415, 47.3769],
            [8.5416, 47.3789],
            [8.5417, 47.3769]
           
          ]
        }
      }
    });
    map.current.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#888',
        'line-width': 8
      }
    });
    });

    //trying the end

  });


  //to update the new values of lat etc...
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });


 




  return (

    <div className ='main'>
      <h1>now focus on the charts useEffect</h1>
      <div ref={mapContainer} style={{ height: "80vh", width:'50%'}}/>

    </div>
  );
  
}

export default App;
