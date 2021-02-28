/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "../components/GapHorizontal";

export function Trait({ color, title, description }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
      }}
    >
      <div
        css={{
          width: "10%",
          height: "70%",
          background: color,
          borderRadius: 16,
        }}
      />
      <GapHorizontal times={4} />
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: 16,
          justifyContent: "center",
          paddingLeft: 4,
        }}
      >
        <div css={{ fontSize: 16, fontFamily: "Poppins", fontWeight: 600 }}>
          {title}
        </div>
        <div
          css={{
            fontSize: 14,
            fontFamily: "Poppins",
            fontWeight: 400,
            maxWidth: 1024,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
