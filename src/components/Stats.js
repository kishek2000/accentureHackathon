import React, { useState } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PerformanceSummary from "./PerformanceSummary";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-grid-system";
import { GapHorizontal } from "./GapHorizontal";
import { GapVertical } from "./GapVertical";

export function Stats() {
  const childName = "Bob";
  const [timespan, setTimespan] = useState("week");

  return (
    <div>
      <LineChart category={"numbers"} timeResolution={timespan} />
      <BarChart />

      <PerformanceSummary childName={childName} />

      <div
        onClick={() => {
          setTimespan("week");
        }}
      >
        Last 7 Days
      </div>
      <div
        onClick={() => {
          setTimespan("month");
        }}
      >
        Last 30 Days
      </div>
      <div>
        <a href="https://www.google.com">Last 365 Days</a>
      </div>
      <p>NOTE: Proficiency = (difficulty rating * accuracy) / time spend</p>
    </div>
  );
}

// export default Stats;
