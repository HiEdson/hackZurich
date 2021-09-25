import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf'

const Map=(props)=>{
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(8.5417);
    const [lat, setLat] = useState(47.3769);
    const [zoom, setZoom] = useState(9);
    const [viewport, setViewport] = useState({
        width: '100%', height: 'calc(100vh - 162px)'
    });

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

            map.current.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [
                            [8.4409, 47.4759],
                            [8.4409, 47.6759],
                            [8.4409, 47.8759]
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

        //});

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
        <div ref={mapContainer} style={{ height: "80vh", width: '50%' }} />
    )


}




export default Map;