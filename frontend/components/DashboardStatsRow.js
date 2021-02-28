/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "../components/GapHorizontal";
import LineChart from "../components/LineChart";
import { AllTraits } from "../components/AllTraits";

export function DashboardStatsRow() {
  return (
    <div css={{ display: "flex", flexDirection: "row" }}>
      <ProficiencyGraph />
      <GapHorizontal times={24} />
      <div
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
          Traits
        </div>
        <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
          We’ve discovered that Jeremy has these traits. Click see more for more
          info.
        </div>
        <AllTraits childName={"Jeremy"} />
      </div>
    </div>
  );
}

export function ProficiencyGraph() {
  return (
    <div css={{ display: "flex", flexDirection: "column", width: "50%" }}>
      <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
        Proficiency
      </div>
      <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
        View Jeremy’s change in proficiency over time. Click see more for more
        analysis.
      </div>
      <LineChart />
    </div>
  );
}
