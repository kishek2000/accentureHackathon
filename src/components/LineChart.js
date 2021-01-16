import React from 'react';
import { Line } from '@reactchartjs/react-chart.js'

const data = {
  labels: [
    '10/1/21', '11/1/21', '12/1/21', '13/1/21', '14/1/21', '15/1/21', '16/1/21'
  ],
  datasets: [
    {
      label: '___CATEGORY_HERE___ Proficiency this __TIME_RANGE__',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'Proficiency (%)'
        }
      },
    ],
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Time (days)'
        }
      },
    ],
  },
}

const LineChart = () => (
  <div style={{padding: "50px"}}>
    <div className='header'>
      <h1 
        style={{textAlign: "center"}} 
        className='title'>___'s progress</h1>
    </div>
    <Line data={data} options={options} />
  </div>
)

export default LineChart