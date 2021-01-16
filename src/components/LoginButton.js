/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

export function LoginButton() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0500FF",
        width: 126,
        height: 34,
        borderRadius: 36,
        fontFamily: "Poppins",
        color: "white",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      LOGIN
    </div>
  );
}
