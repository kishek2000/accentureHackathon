/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import BarChart from "./BarChart";

export function TimeSpentGraph() {
  return (
    <div css={{ display: "flex", flexDirection: "column", width: "50%" }}>
      <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
        Time Spent
      </div>
      <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
        View the amount of time Jeremy has spent in each module!
      </div>
      <GapVertical times={4} />
      <BarChart />
    </div>
  );
}
