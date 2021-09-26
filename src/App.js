import train from './train.png';
import './App.css';
import './Table.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import mapboxToken from './AllKeys';
//components
import Map from './Map'
import Table from './Table'
import ChartLine from './ChartLine'
import PlaceFromCoor from './PlaceFromCoor';
import CountDown from './CountDown'


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
  
  //fot the time between one event and other
  //<Map></Map>
  const [duration, setDuration] = useState(180)

    return (
    <div className ='main'>

      <div className='table' style={{display: 'flex', flexDirection: 'row'}}>
        {map}
      <div className='tableComp'>
        <p id='message'></p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          
            <Table mapComponent={mapComponentRef} />
            <CountDown time={duration}></CountDown>
        </div>

      </div>
      
      </div>
      <ChartLine></ChartLine>
      <PlaceFromCoor GetPlaces={data}></PlaceFromCoor>
      
    </div>
    )

}

export default App;
