/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { topicAnalytics } from "../store/topicAnalytics";
import { GapVertical } from "./GapVertical";

let thisWeekTimes = [];
let thisMonthTimes = [];

topicAnalytics.forEach((eachTopic) => {
  eachTopic.times.forEach((eachTime) => {
    if (eachTime.label === "This Month") {
      thisMonthTimes.push(eachTime.data);
    }
    if (eachTime.label === "This Week") {
      thisWeekTimes.push(eachTime.data);
    }
  });
});

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


const BarChart = ({ timeResolution }) => {
  const data = {
    labels: ["Shapes", "Colours", "Actions", "Objects"],
    datasets: [
      {
        label: "This Month",
        backgroundColor: "rgba(2, 207, 196,0.5)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(3, 110, 104,0.75)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: thisMonthTimes,
      },
      {
        label: "This Week",
        backgroundColor: "rgba(73, 87, 214,0.5)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(40, 49, 130,0.75)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: thisWeekTimes,
      },
    ],
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
            labelString: "Categories",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: "Time Spent (hr)",
          },
        },
      ],
    },
  };

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

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        css={{
          background: "white",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <HorizontalBar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
