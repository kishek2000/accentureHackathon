import React from 'react';
import { Line } from '@reactchartjs/react-chart.js'
import { topicAnalytics } from '../store/data' 

const uppercaseAll = (text) => {
  if (text) {
    return text.toUpperCase();
  }
}

const LineChart = ({ category, timeResolution }) => {
  // TODO: Replace hardcoded dates 
  let dates = [];
  switch (timeResolution) {
    case "week":
      dates = ['10/1/21', '11/1/21', '12/1/21', '13/1/21', '14/1/21', '15/1/21', '16/1/21'];
      break;
    case "month":
      dates = [
        '20/12/20', '21/12/20', '22/12/20', '23/12/20', '24/12/20', '25/12/20', '26/12/20',
        '27/12/20', '28/12/20', '29/12/20', '30/12/20', '31/12/20', '1/1/21', '2/1/21',
        '3/1/21', '4/1/21', '5/1/21', '6/1/21', '7/1/21', '8/1/21', '9/1/21',
        '10/1/21', '11/1/21', '12/1/21', '13/1/21', '14/1/21', '15/1/21', '16/1/21'];
      break;
    default:
      dates = ['10/1/21', '11/1/21', '12/1/21', '13/1/21', '14/1/21', '15/1/21', '16/1/21'];
      break;
  }
  const data = {
    labels: dates,
    datasets: topicAnalytics.map((eachTopic) => {
      let datapoints = eachTopic.data;
      switch(timeResolution) {
        case "week":
          datapoints = datapoints.slice(23, 30);
          break;
        case "month":
          datapoints = datapoints.slice(0, 30);
          break;
        default:
          break;
      }
      return {
        label: `Proficiency in ${uppercaseAll(eachTopic.label)} this ${uppercaseAll(timeResolution)}`,
        data: datapoints,
        fill: false,
        backgroundColor: eachTopic.colour,
        borderColor: eachTopic.colour,
      };
    }),
  };
  const options = {
    legend: {
      labels: {
        fontColor: "black",
      }
    },
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
            labelString: 'Date'
          }
        },
      ],
    },
  };
  
  return (
    <div style={{padding: "50px"}}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart