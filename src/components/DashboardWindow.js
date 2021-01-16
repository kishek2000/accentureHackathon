/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { GapVertical } from "../components/GapVertical";
import { GapHorizontal } from "../components/GapHorizontal";
import { CourseCard } from "../components/CourseCard";

export function DashboardWindow({ courseList }) {
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
        {courseList.map((i) => (
          <>
            <CourseCard title={i.title} thumbnail={i.thumbnail} />
            <GapHorizontal times={6} />
          </>
        ))}
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
