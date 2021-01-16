/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { LoginWindow } from "../components/LoginWindow";

export default function Home() {
  return (
    <main
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoginWindow />
    </main>
  );
}
