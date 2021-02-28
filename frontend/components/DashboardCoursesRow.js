/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { GapHorizontal } from "./GapHorizontal";
import { ContinueCourseRow } from "./ContinueCourseRow";
import { RecommendedCoursesRow } from "./RecommendedCoursesRow";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

export function DashboardCoursesRow() {
  return (
    <div css={{ display: "flex", flexDirection: "column" }}>
      <GapVertical times={30} />
      <div css={{ display: "flex", flexDirection: "row", alignItems: "top" }}>
        <ContinueCourseRow />
        <GapHorizontal times={24} />
        <RecommendedCoursesRow />
      </div>
    </div>
  );
}
