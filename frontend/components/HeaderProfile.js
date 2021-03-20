/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useState } from "react";
import { AvatarImage } from "./AvatarImage";
import { GapVertical } from "./GapVertical";

export function HeaderProfile() {
  const [childName, setChildName] = useState("");
  useEffect(() => {
    setChildName(JSON.parse(localStorage.getItem("currChild"))["name"]);
  });

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "28px",
        right: "40px",
        background: "white",
        borderRadius: 16,
        padding: 8,
        boxShadow: "0px 0px 48px rgba(0,0,0,0.1)",
      }}
    >
      <AvatarImage size="small" />
      <GapVertical times={1} />
      <div
        css={{
          fontFamily: "Poppins",
          fontSize: 12,
          fontWeight: 300,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {childName}
      </div>
    </div>
  );
}
