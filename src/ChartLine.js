import React from "react";
import {Line} from 'react-chartjs-2'
//import './ChartLine.css'


//Here i just added the line chart. 
//I used the react-chartjs-2 library  which is a React wrapper for Chart.js (chartjs.org)

const ChartLine =()=>{
    const data = {
        labels: ['Red', 'Blue', 'Green', 'Green', 'Green', 'Orange', 'Green', 'Purple', 'Orange'],
        datasets: [{
            //first Grapth
            label: 'current blablabla',
            data: [2, 3, 3.2, 1.2, 2, 3],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 0.8
        },

        //second graph
        {
            label: 'voltage blablabla',
            data: [1, 1.001, 1.01, 7, 2, 3],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 0.8
        }
    ]


    }
    
    return (

        <div style={{width:'52%', height:'250px'}} >
            <Line 
                data={data}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                }}

            />
        </div>
    )
}



export default ChartLine;