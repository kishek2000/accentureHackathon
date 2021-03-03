/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { GapVertical } from "../components/GapVertical";
import { ProficiencyGraph } from "../components/DashboardStatsRow";
import { GapHorizontal } from "../components/GapHorizontal";
import { TimeSpentGraph } from "../components/TimeSpentGraph";

export function AboutScreen() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: 240,
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <GapVertical times={20} />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "top",
          width: "90%",
        }}
      >
        <ProficiencyGraph />
        <GapHorizontal times={24} />
        <TimeSpentGraph />
      </div>
      <GapVertical times={9} />

      <GapVertical times={15} />
    </div>
  );
}
