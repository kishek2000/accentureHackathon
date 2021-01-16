/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { RegisterChildWindow } from "../components/RegisterChildWindow";

export default function RegisterChild() {
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
      <RegisterChildWindow />
    </main>
  );
}
