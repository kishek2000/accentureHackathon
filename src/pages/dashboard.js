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
        height: "100vh",
        margin: "0px 160px",
      }}
    >
      <DashboardWindow courseList={courses.courses} />
    </main>
  );
}
