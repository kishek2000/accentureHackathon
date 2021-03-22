/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import React from "react";
import { Line } from "@reactchartjs/react-chart.js";
import { topicAnalytics } from "../store/topicAnalytics";
import { GapVertical } from "./GapVertical";

const uppercaseAll = (text) => {
  if (text) {
    return text.toUpperCase();
  }
};

/*
Some pseudocode:

const dataToPlot = []

const extractProficiencyOnDay = (startTimestamp, endTimestamp, course_id) {
    statsInRange = categorical_stats[course_id].filter((stat) => {
        stat.date > startTimestamp && stat.date < endTimestamp
    })
    // use reduce() to get the avg proficiency of statsInRange
}

const getDatapointsThisMonth = () => {
    for startTimestamp, endTimestamp in last 30 days:
        proficiencyThatDay = extractProficiencyOnDay(startTimestamp, endTimestamp)
        dataToPlot.push(proficiencyThatDay)
}

dataToPlot looks like this: [
    39, 40, 42, 45, 47, 41, 44, 40, 55, 58, 60, 55, 58, 61, 62, 57, 65, 68, 69, 75, 74, 72, 75, 77, 78, 79, 80, 75, 72, 82, 85, 90, 90
]

*/


const LineChart = ({ category, timeResolution }) => {
  // TODO: Replace hardcoded dates
  let dates = [];
  switch (timeResolution) {
    case "week":
      // TODO: generate dates strings of today to 7 days ago (maybe map timestamps directly to date strings using Date() methods)
      dates = [
        "10/1/21",
        "11/1/21",
        "12/1/21",
        "13/1/21",
        "14/1/21",
        "15/1/21",
        "16/1/21",
      ];
      break;
    case "month":
      // TODO: generate dates strings of today to 30 days ago 
      dates = [
        "20/12/20",
        "21/12/20",
        "22/12/20",
        "23/12/20",
        "24/12/20",
        "25/12/20",
        "26/12/20",
        "27/12/20",
        "28/12/20",
        "29/12/20",
        "30/12/20",
        "31/12/20",
        "1/1/21",
        "2/1/21",
        "3/1/21",
        "4/1/21",
        "5/1/21",
        "6/1/21",
        "7/1/21",
        "8/1/21",
        "9/1/21",
        "10/1/21",
        "11/1/21",
        "12/1/21",
        "13/1/21",
        "14/1/21",
        "15/1/21",
        "16/1/21",
      ];
      break;
    default:
      // TODO: generate dates strings of today to 7 days ago 
      dates = [
        "10/1/21",
        "11/1/21",
        "12/1/21",
        "13/1/21",
        "14/1/21",
        "15/1/21",
        "16/1/21",
      ];
      break;
  }
  const data = {
    labels: dates,
    datasets: topicAnalytics.map((eachTopic) => {
      let datapoints = eachTopic.data;
      switch (timeResolution) {
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
        label: `${eachTopic.label}`,
        data: datapoints,
        fill: false,
        hidden: !(
          eachTopic.label === "Numbers" || eachTopic.label === "Shapes"
        ),
        backgroundColor: eachTopic.colour,
        borderColor: eachTopic.colour,
      };
    }),
  };
  const options = {
    legend: {
      labels: {
        fontColor: "black",
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: "Proficiency (%)",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
        },
      ],
    },
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <GapVertical times={4} />
      <div
        css={{
          background: "white",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
