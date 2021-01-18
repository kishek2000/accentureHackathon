/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { RegisterWindow } from "../components/RegisterWindow";

export default function Register() {
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
      <RegisterWindow />
    </main>
  );
}
