/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "../components/GapHorizontal";
import LineChart from "../components/LineChart";
import { AllTraits } from "../components/AllTraits";
import { useEffect, useState } from "react";

export function DashboardStatsRow() {
  const [childName, setChildName] = useState("");
  useEffect(() => {
    setChildName(JSON.parse(localStorage.getItem("currChild"))["name"]);
  });

  return (
    <div css={{ display: "flex", flexDirection: "row", overflow: "hidden" }}>
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
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: 16,
            fontWeight: 400,
            width: "100%",
          }}
        >
          We’ve discovered that {childName} has these traits.
        </div>
        <AllTraits childName={childName} />
      </div>
    </div>
  );
}

export function ProficiencyGraph() {
  const [childName, setChildName] = useState();

  useEffect(() => {
    setChildName(JSON.parse(localStorage.getItem("currChild"))["name"]);
  });

  return (
    <div css={{ display: "flex", flexDirection: "column", width: "45%" }}>
      <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
        Proficiency
      </div>
      <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
        View {childName}’s change in proficiency over time.
      </div>
      <LineChart />
    </div>
  );
}
