/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";

export function LoginButton({ handleLogin }) {
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
        borderRadius: 16,
        fontFamily: "Poppins",
        color: "white",
        fontWeight: 600,
        cursor: "pointer",
      }}
      onClick={handleLogin}
    >
      SIGN IN
    </div>
  );
}
