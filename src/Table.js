import React, { useEffect } from 'react';
import {useTable} from 'react-table';
import mapboxgl from 'mapbox-gl';
import PlaceFromCoor from './PlaceFromCoor';

const BingApiKey = 'AldVDbYSTRXvur92g-3l7xC6VlU8uykROwqGGL1P1L76lkHxgM0lO7avQOOs4Nam';


const Table = (props)=>{

    const data = React.useMemo(
        () => [
        {
            problem: 'Cable Fault',
            timestamp: '24.9.2021 12:04',
            lng: 8.4409,
            lat: 47.2759
        },
        {
            problem: 'Potential Interference',
            timestamp: '25.9.2021 15:07',
            lng: 8.4409,
            lat: 47.4759
        },
        {
            problem: 'External Cause',
            timestamp: '25.9.2021 17:22',
            lng: 8.4409,
            lat: 47.6759
        },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
        {
            Header: 'Problem',
            accessor: 'problem', // accessor is the "key" in the data
        },
        {
          Header: 'Time',
          accessor: 'timestamp',
        },
        /*{
            Header: 'Longitude',
            accessor: 'lng',
        },
        {
            Header: 'Latitude',
            accessor: 'lat',
        },*/
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    const locationPicture = React.createRef();

    useEffect(() => {
      const script = document.createElement('script');
    
      script.src = 'https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key='+BingApiKey;
      //script.async = true;
    
      document.body.appendChild(script);
    
      return () => {
        document.body.removeChild(script);
      }
    }, []);

    return (
      <div >
        
        <table {...getTableProps()} style={{ border: 'solid 1px blue', marginBottom:'6px', width:'100%'}}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: 'solid 3px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps({onMouseEnter: () => {drawHighlightMarker(props.mapComponent.current, row)}, onMouseLeave: () => removeHighlightMarker(props.mapComponent.current)})}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div id="locationPicture" style={{ width: '500px', height: '260px', marginTop:'40px' }}></div>
      </div>

    );
}

const marker = new mapboxgl.Marker();

function drawHighlightMarker(map, row){
  console.log(row);
  marker.setLngLat([row.original.lng, row.original.lat]);
  marker.addTo(map);
  if(typeof window.Microsoft == undefined){return}
  var map = new window.Microsoft.Maps.Map(document.getElementById('locationPicture'), {
    //mapTypeId: window.Microsoft.Maps.MapTypeId.road,
    //mapTypeId: window.Microsoft.Maps.MapTypeId.streetside,
    mapTypeId: window.Microsoft.Maps.MapTypeId.birdseye,
    //zoom: 18,
    center: new window.Microsoft.Maps.Location(row.original.lat, row.original.lng)
  });
  //map.setView({ mapTypeId: window.Microsoft.Maps.MapTypeId.streetside });
}

function removeHighlightMarker(map){
  marker.remove();
}

export default Table;