import React, { useRef } from 'react';
import {useTable} from 'react-table';
import mapboxgl from 'mapbox-gl';

const Table = (props)=>{
    const data = React.useMemo(
        () => [
        {
            problem: 'Cable problem upcoming',
            timestamp: '24.9.2021 12:04',
            lon: 8.4409,
            lat: 47.2759
        },
        {
            problem: 'Potential interference',
            timestamp: '25.9.2021 15:07',
            lon: 8.4409,
            lat: 47.4759
        },
        {
            problem: 'Cable problem upcoming',
            timestamp: '25.9.2021 17:22',
            lon: 8.4409,
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
        {
            Header: 'Longitude',
            accessor: 'lon',
        },
        {
            Header: 'Latitude',
            accessor: 'lat',
        },
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

    return (
    <div>
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
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
                <tr {...row.getRowProps()} onMouseEnter={() => {console.log(props.mapComponent); drawMarkerOnMap(props.mapComponent.current, 8.4409, 47.6759)}}>
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
      </div>
    );
}

function drawMarkerOnMap(map, lng, lat){
  const marker = new mapboxgl.Marker()
  marker.setLngLat([lng, lat])
  marker.addTo(map)
}

export default Table;