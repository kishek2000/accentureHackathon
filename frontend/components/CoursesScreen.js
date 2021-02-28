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
      }}
    >
      <GapVertical times={30} />
      <RecommendedCoursesRow />
      <GapVertical times={10} />
      <AllCoursesRow />
    </div>
  );
}
