/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "../components/GapVertical";
import { GapHorizontal } from "../components/GapHorizontal";
import { CourseCard } from "../components/CourseCard";

export default function Dashboard() {
  return (
    <main
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        margin: "0px 160px",
      }}
    >
      <DashboardWindow />
    </main>
  );
}

function DashboardWindow() {
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
