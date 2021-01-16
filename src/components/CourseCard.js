/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { GapVertical } from "../components/GapVertical";

export function CourseCard({ title, thumbnail }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 360,
        background: "white",
        boxShadow: "0px 4px 42px 7px rgba(213, 213, 213, 0.37)",
        borderRadius: 16,
        cursor: "pointer",
        // "&:hover": {
        //   width: 370,
        //   height: 390,
        // },
        transition: "0.1s",
      }}
    >
      <img src={thumbnail} css={{ width: "100%" }} />
      <GapVertical times={10} />
      <div css={{ fontFamily: "Poppins", fontSize: 30 }}>{title}</div>
      <GapVertical times={10} />
    </div>
  );
}
