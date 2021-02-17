/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { topicAnalytics } from "../store/data";
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
        // width: "50%",
      }}
    >
      <GapVertical times={8} />
      <div css={{ fontFamily: "Poppins", fontSize: 24, fontWeight: 400 }}>
        Time Spent
      </div>
      <GapVertical times={4} />
      <HorizontalBar data={data} options={options} />
    </div>
  );
};

export default BarChart;
