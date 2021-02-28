/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { ProficiencyGraph } from "./DashboardStatsRow";
import { GapHorizontal } from "./GapHorizontal";
import { TimeSpentGraph } from "./TimeSpentGraph";

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
