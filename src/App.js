import train from './train.png';
import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
//import * as turf from '@turf/turf'
import Map from './Map'

mapboxgl.accessToken = 'pk.eyJ1IjoiaG9zc2lpIiwiYSI6ImNra2sxeXVlbjI0cW4ydnF1bXM4eWdyd3YifQ.clb20iW-d2O_Aj5WRYwIiQ';

function App() {
  
  return (

    <div className ='main'>

      <h1>Happy coding</h1>
      <Map></Map>
  
    </div>
  );
  
}

export default App;
