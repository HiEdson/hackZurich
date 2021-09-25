import train from './train.png';
import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import mapboxToken from './AllKeys'
//components
import Map from './Map'
import ChartLine from './ChartLine'
import PlaceFromCoor from './PlaceFromCoor';

mapboxgl.accessToken = 'pk.eyJ1IjoiaG9zc2lpIiwiYSI6ImNra2sxeXVlbjI0cW4ydnF1bXM4eWdyd3YifQ.clb20iW-d2O_Aj5WRYwIiQ';

function App(props) {

  //This code will be used to get city name from lat long
  const [data, setData] = useState([0,0]);
  const GetPlaces = () => {
    //test coordinate
    setData([8.5417, 47.3769]);
    console.log(data)
  }
  
  return (
    <div className='main' >
      <a onClick={GetPlaces}>press</a>
      <h1>Hey guys, our code have some packages created 2 days ago. 
        instead of lat and long, let display the name of the city, and when the 
        nmap zooms we should show the lat long with the on click on the flag.
        Show in the red color the path that have a problem
        I think its a problem. We will have to migrate the code to a updated one.
      </h1>
      <Map></Map>
      <ChartLine></ChartLine>
      <PlaceFromCoor GetPlaces={data}></PlaceFromCoor>
    </div>
  );
  
}

export default App;
