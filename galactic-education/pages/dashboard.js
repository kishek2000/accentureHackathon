/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { courses } from "../store/courses";
import { DashboardWindow } from "../components/DashboardWindow";

export default function Dashboard() {
  return (
    <main
      css={{
        display: "flex",
        flexDirection: "column",
        // height: "100vh",
        background:
          "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(237,237,237,1) 50%, rgba(255,255,255,1) 100%)",
      }}
    >
      <DashboardWindow courseList={courses.courses} />
    </main>
  );
}
