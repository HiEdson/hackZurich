import React from "react";

const token ='pk.eyJ1IjoiaG9zc2lpIiwiYSI6ImNra2sxeXVlbjI0cW4ydnF1bXM4eWdyd3YifQ.clb20iW-d2O_Aj5WRYwIiQ';

const PlaceFromCoor =(props)=>{

    const dispCity=(data)=> document.getElementById('cityname').innerHTML= data;

    let LatLng = props.GetPlaces;
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${LatLng[0]},${LatLng[1]}.json?access_token=`+token, { method: 'GET'})
        .then(response => response.json())
        .then(data => dispCity(data.features[0].place_name))
        .catch(function (err) {
            console.log('there is a problem: ' + err)
        });
    return(
        <p id='cityname'></p>
    )
}

export default PlaceFromCoor;