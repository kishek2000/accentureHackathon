/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "../components/GapHorizontal";

export function DashboardGalacticEdLogoRow() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 36,
      }}
    >
      <img src={"/logo.png"} css={{ width: 36, height: 36 }} />
      <GapHorizontal times={2} />
      <div css={{ display: "flex", flexDirection: "column" }}>
        <div
          css={{
            fontFamily: "Poppins",
            fontWeight: 300,
            color: "#120F3E",
            fontSize: 18,
            marginTop: -1,
          }}
        >
          GalacticEd
        </div>
        <div
          css={{
            fontFamily: "Poppins",
            fontWeight: 300,
            color: "#120F3E",
            fontSize: 9,
            marginTop: -2,
          }}
        >
          Learning tailored to you.
        </div>
      </div>
    </div>
  );
}
