/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "../components/GapHorizontal";

export function Trait({ color, title, description }) {
  return (
    <div css={{ display: "flex", flexDirection: "row" }}>
      <div css={{ height: 48, width: 48, background: color }} />
      <GapHorizontal times={4} />
      <div css={{ display: "flex", flexDirection: "column" }}>
        <div css={{ fontSize: 20, fontFamily: "Poppins", fontWeight: 600 }}>
          {title}
        </div>
        <div css={{ fontSize: 16, fontFamily: "Poppins", fontWeight: 400 }}>
          {description}
        </div>
      </div>
    </div>
  );
}
