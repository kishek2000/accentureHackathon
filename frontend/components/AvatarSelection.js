/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
export function AvatarSelection({ avatar, handleAvatarOverlayCallback }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        height: 48,
        width: 480,
        borderRadius: 16,
        paddingLeft: 24,
        fontFamily: "Poppins",
        fontSize: 18,
        fontWeight: 300,
        color: !avatar ? "rgba(0,0,0,0.6)" : "black",
        cursor: "pointer",
      }}
      onClick={handleAvatarOverlayCallback}
    >
      {avatar ? avatar[0].toUpperCase() + avatar.slice(1) : "Select Avatar"}
    </div>
  );
}
