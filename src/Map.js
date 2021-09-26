import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
//import * as turf from '@turf/turf'
import './Map.css'
import PlaceFromCoor from './PlaceFromCoor';
import trackPositions from './track_geopositions.json'


const dataTrain = [
    
    {
        "alert_signal_data": {
            "Latitude": 47.245234,
            "Longitude": 8.187357,
            "DateTime": '2021-02-25 16:32:55',
            "noise": 165283,
            "snr": 22.842204,
            "RSSI": 2.30,
          "disruptionDiscriptionEnglish": "Emergency brake activated",
            "disruptionDiscriptionGerman": "Zwangsbremse wurde aktiviert",
            "cause": "external interferance"
        },
        "occured_signal_data": {
            "Latitude": 47.240980,
            "Longitude": 8.189333,
            "DateTime": '2021-02-25 16:35:57',
            "noise": 165283,
            "snr": 22.847238,
            "RSSI": 2.16,
          "disruptionDiscriptionEnglish": "Emergency brake activated",
            "disruptionDiscriptionGerman": "Zwangsbremse wurde aktiviert",
            "cause": "external interferance"
        }
    },
    {
        "alert_signal_data": {
            "Latitude": 47.28648428866059,
            "Longitude": 8.138365797107,
            "DateTime": '2021-02-25 16:32:55',
            "noise": 165283,
            "snr": 22.842204,
            "RSSI": 2.30,
            "disruptionDiscriptionEnglish": "Emergency brake activated",
            "disruptionDiscriptionGerman": "Zwangsbremse wurde aktiviert",
            "cause": "external interferance"
        },
        "occured_signal_data": {
            "Latitude": 47.284120217469095,
            "Longitude": 8.14022629002423,
            "DateTime": '2021-02-25 16:35:57',
            "noise": 165283,
            "snr": 22.847238,
            "RSSI": 2.16,
            "disruptionDiscriptionEnglish": "Emergency brake activated",
            "disruptionDiscriptionGerman": "Zwangsbremse wurde aktiviert",
            "cause": "external interferance"
        }
    }

]


const token = 'pk.eyJ1IjoiaG9zc2lpIiwiYSI6ImNra2sxeXVlbjI0cW4ydnF1bXM4eWdyd3YifQ.clb20iW-d2O_Aj5WRYwIiQ';

const GetLocal = (coor) => {
    let result;
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coor[0]},${coor[1]}.json?access_token=` + token, { method: 'GET' })
        .then(response => response.json())
        .then(data => result = data.features[0].place_name)
        .catch(function (err) {
            console.log('there is a problem: ' + err)
        });
    return result;
}
/*0:
1:
alert_signal_data: {Latitude: 47.245234, Longitude: 8.187357, DateTime: '2021-02-25 16:32:55', noise: 165283, snr: 22.842204, …}
occured_signal_data: {Latitude: 47.24098, Longitude: 8.189333, DateTime: '2021-02-25 16:35:57', noise: 165283, snr: 22.847238, …}
[[Prototype]]: Object
2: {alert_signal_data: {…}, occured_signal_data: {…}}
*/


//console.log(dataTrain[0][1].alert_signal_data)


const Map=(props)=>{

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(8.11290653976802);
    const [lat, setLat] = useState(47.3150004855523);
    const [zoom, setZoom] = useState(10);
    const [showLoc, setshowLoc] = useState('');
    const [viewport, setViewport] = useState({
        width: '100%', height: 'calc(100vh - 162px)'
    });
    
    //for the message on the left side.
    const showSms = useRef(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        props.setMapComponentRef(map);

        map.current.on('load', () => {

            const popup1 = new mapboxgl.Popup({ offset: 25 }).setHTML(
                '<p> Alert signal started in at ' + dataTrain[0].alert_signal_data.DateTime+ '</p>'
                
                //ege egege gegegeeddhb ddidid dhddd dd <h4>.
                //'<h4> This alert started at ' + dataTrain[0].alert_signal_data.DateTime + 'in ' + dataTrain[0].alert_signal_data.DateTime
            );
            const warning = document.createElement('div');
            warning.className = 'warningmarker';
            new mapboxgl.Marker(warning).setLngLat([dataTrain[0].alert_signal_data.Longitude, dataTrain[0].alert_signal_data.Latitude])
                .setPopup(popup1)
                .addTo(map.current);
            
            const warning2 = document.createElement('div');
            warning2.className = 'warningmarker2';
            const popup2 = new mapboxgl.Popup({ offset: 25 }).setHTML(
                '<p> Alert signal started in at ' + dataTrain[1].alert_signal_data.DateTime + '</p>'

                //ege egege gegegeeddhb ddidid dhddd dd <h4>.
                //'<h4> This alert started at ' + dataTrain[0].alert_signal_data.DateTime + 'in ' + dataTrain[0].alert_signal_data.DateTime
            );
            new mapboxgl.Marker(warning2).setLngLat([dataTrain[1].alert_signal_data.Longitude, dataTrain[1].alert_signal_data.Latitude])
                .setPopup(popup2)
                .addTo(map.current);
            
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                'Construction on the Washington Monument began in 1848.'
            );
            const el = document.createElement('div');
            el.className = 'marker';
            new mapboxgl.Marker(el).setLngLat([8.4409, 47.2759]).setPopup(popup).addTo(map.current);
            map.current.addLayer({
                type: 'circle',
                paint: {
                    'circle-radius': ['-', 2017, ['number', ['get', 'Constructi'], 2017]],
                    'circle-opacity': 0.8,
                    'circle-color': 'rgb(171, 72, 33)'
                }
            });


            map.current.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': trackPositions
                        /*[
                            [8.4409, 47.4759],
                            [8.4409, 47.6759],
                            [8.4409, 47.8759]
                        ]*/
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


        map.current.once('load', () => {
            map.current.resize();
        });

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
        <div>
            
            <div ref={mapContainer} style={{ height: "80vh", width: '540px' }} />
        </div>
    )

}




export default Map;