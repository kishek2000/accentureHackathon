/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { GapHorizontal } from "./GapHorizontal";
import { CourseCard } from "./CourseCard";

export function DashboardWindow() {
  return (
    <div>
      <GapVertical times={35} />
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 900,
          fontSize: 64,
          alignSelf: "center",
        }}
      >
        Welcome Back!
      </div>
      <GapVertical times={12} />
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: 36,
          alignSelf: "center",
        }}
      >
        Courses
      </div>
      <GapVertical times={8} />
      <div
        css={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <CourseCard title="Shapes" thumbnail="shapesThumbnail.png" />
        <GapHorizontal times={6} />
        <CourseCard title="Colours" thumbnail="coloursThumbnail.png" />
      </div>
      <GapVertical times={24} />
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: 36,
          alignSelf: "center",
        }}
      >
        Liam's Progress
      </div>
    </div>
  );
}
