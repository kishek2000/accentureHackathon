/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

export function RegistrationHeader() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 48,
        left: "50%",
        transform: "translate(-50%, 0%)",
      }}
    >
      <img
        src={"/logo.png"}
        style={{ width: 48, height: 48, objectFit: "contain" }}
      />
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 800,
          fontSize: 48,
        }}
      >
        GalaticEd
      </div>
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 200,
          fontSize: 16,
          marginTop: -12,
        }}
      >
        Learning tailored to you.
      </div>
    </div>
  );
}
