/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "../components/GapVertical";

export default function Dashboard() {
  return (
    <main
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        margin: "0px 196px",
      }}
    >
      <DashboardWindow />
    </main>
  );
}

function DashboardWindow() {
  return (
    <div>
      <GapVertical times={50} />
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
      <div
        css={{
          width: 240,
          height: 216,
          background: "white",
          boxShadow: "0px 4px 32px 7px rgba(213, 213, 213, 0.37)",
          borderRadius: 16,
        }}
      ></div>
      <GapVertical times={12} />
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
