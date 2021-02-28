/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { DashboardCoursesRow } from "./DashboardCoursesRow";
import { DashboardStatsRow } from "./DashboardStatsRow";

export function DashboardScreen() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: 240,
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <GapVertical times={20} />
      <DashboardCoursesRow />
      <GapVertical times={12} />
      <DashboardStatsRow />
    </div>
  );
}
