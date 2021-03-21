/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { DashboardCoursesRow } from "../components/DashboardCoursesRow";
import { DashboardStatsRow } from "../components/DashboardStatsRow";
import { GapVertical } from "../components/GapVertical";
import { HeaderProfile } from "../components/HeaderProfile";

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
      <HeaderProfile />
    </div>
  );
}
