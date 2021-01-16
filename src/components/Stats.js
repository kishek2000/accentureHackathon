import React, { useState } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PerformanceSummary from "./PerformanceSummary";
import { Container, Row, Col } from "react-grid-system";
import { GapVertical } from "./GapVertical";

export function Stats() {
  const childName = "Bob";
  const [timespan, setTimespan] = useState("week");

  return (
    <div>
      <GapVertical times={4} />
      <Container style={{ margin: 0, maxWidth: "none", paddingLeft: 0 }}>
        <Row style={{ margin: 0 }}>
          <Col sm={6} style={{ margin: 0, paddingLeft: 0 }}>
            <LineChart category={"numbers"} timeResolution={timespan} />
          </Col>
          <Col sm={6} style={{ margin: 0, paddingLeft: 0 }}>
            <BarChart />
          </Col>
        </Row>
      </Container>

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
