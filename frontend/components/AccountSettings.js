/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";

export function AccountSettings() {
  return (
    <>
      <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
        Account Settings
      </div>
      <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
        Update your account settings
      </div>
      <GapVertical times={6} />
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          background: "white",
          padding: 16,
          borderRadius: 16,
          width: "100%",
          height: "30%",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
        }}
      ></div>
    </>
  );
}
