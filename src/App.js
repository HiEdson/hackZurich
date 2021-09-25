import train from './train.png';
import './App.css';
import './Table.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import mapboxToken from './AllKeys'
//components
import Map from './Map'
import Table from './Table'
import ChartLine from './ChartLine'
import PlaceFromCoor from './PlaceFromCoor';


mapboxgl.accessToken = 'pk.eyJ1IjoiaG9zc2lpIiwiYSI6ImNra2sxeXVlbjI0cW4ydnF1bXM4eWdyd3YifQ.clb20iW-d2O_Aj5WRYwIiQ';

function App() {
  const [mapComponentRef, setMapComponentRef] = useState(null);
  //This code will be used to get city name from lat long
  const [data, setData] = useState([0,0]);
  const GetPlaces = () => {
    //test coordinate
    setData([8.5417, 47.3769]);
    console.log(data)
  }
  const map = React.createElement(Map, {setMapComponentRef: setMapComponentRef});
  
  return (
    <div className ='main'>
      <h1>Hey guys, our code have some packages created 2 days ago. 
        instead of lat and long, let display the name of the city, and when the 
        map zooms we should show the lat long with the on click on the flag.
        Show in the red color the path that have a problem
        I think its a problem. We will have to migrate the code to a updated one.
      </h1>
      <button onClick={GetPlaces}>press</button>
      <div className='table' style={{display: 'flex', flexDirection: 'row'}}>
      {map}
      <div className='tableComp'>
        <Table mapComponent={mapComponentRef} />
      </div>
      </div>
      <ChartLine></ChartLine>
      <PlaceFromCoor GetPlaces={data}></PlaceFromCoor>
      
      </div>
    )

}

export default App;
