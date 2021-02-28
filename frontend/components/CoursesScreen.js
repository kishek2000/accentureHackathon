/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { RecommendedCoursesRow } from "./RecommendedCoursesRow";
import { AllCoursesRow } from "./AllCourses";

export function CoursesScreen() {
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
      <RecommendedCoursesRow />
      <GapVertical times={8} />
      <AllCoursesRow />
    </div>
  );
}
