/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
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
    <div css={{ display: "flex", flexDirection: "column" }}>
      <LineChart category={"numbers"} timeResolution={timespan} />
      <GapVertical times={4} />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => {
            setTimespan("week");
          }}
          css={{
            fontFamily: "Poppins",
            fontSize: 16,
            color: timespan === "week" ? "white" : "black",
            background: timespan === "week" ? "#0038FF" : "white",
            boxShadow:
              timespan !== "week"
                ? "0px 0px 8px 2px rgba(213, 213, 213, 0.37)"
                : "none",
            borderRadius: 16,
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Last 7 Days
        </div>
        <GapHorizontal times={4} />
        <div
          onClick={() => {
            setTimespan("month");
          }}
          css={{
            fontFamily: "Poppins",
            fontSize: 16,
            color: timespan === "month" ? "white" : "black",
            background: timespan === "month" ? "#0038FF" : "white",
            boxShadow:
              timespan !== "month"
                ? "0px 0px 8px 2px rgba(213, 213, 213, 0.37)"
                : "none",
            borderRadius: 16,
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Last 30 Days
        </div>
      </div>
      <BarChart />

      <GapVertical times={6} />
      <p css={{ fontFamily: "Poppins", textAlign: "center" }}>
        NOTE: Proficiency = (difficulty rating * accuracy) / time spent
      </p>
      <GapVertical times={30} />
    </div>
  );
}

// export default Stats;
