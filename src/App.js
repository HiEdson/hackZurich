import train from './train.png';
import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
//import * as turf from '@turf/turf'
import Map from './Map'
import Table from './Table'

mapboxgl.accessToken = 'pk.eyJ1IjoiaG9zc2lpIiwiYSI6ImNra2sxeXVlbjI0cW4ydnF1bXM4eWdyd3YifQ.clb20iW-d2O_Aj5WRYwIiQ';

function App() {
  const [mapComponentRef, setMapComponentRef] = useState(null);

  const map = React.createElement(Map, {setMapComponentRef: setMapComponentRef});
  //<Map></Map>
  return (
    <div className ='main'>
      <h1>Happy coding,
        There is a pull request, and i have to after change the color of the chart to mach your table, it look amazing.
        let also add the accuracy in the table
      </h1>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      {map}
      <Table mapComponent={mapComponentRef} />
      </div>
    </div>
  );
}

export default App;
