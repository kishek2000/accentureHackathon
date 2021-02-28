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
        background:
          "linear-gradient(139.72deg, #E1E0FF 11.63%, #FDDDDD 44.53%, #FFFCDE 77.06%)",
      }}
    >
      <RegisterChildWindow />
    </main>
  );
}
