/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { GapVertical } from "../components/GapVertical";

export function CourseCard({ title, thumbnail, handleCourseCallback }) {
  return (
    <div
      // href={"/" + lesson}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 270,
        height: 180,
        background: "white",
        boxShadow: "0px 4px 42px 7px rgba(213, 213, 213, 0.37)",
        borderRadius: 16,
        cursor: "pointer",
        transition: "0.1s",
      }}
      onClick={() => handleCourseCallback(title)}
    >
      <img src={thumbnail} css={{ width: "100%", height: "100%" }} />
      <GapVertical times={10} />
      <div css={{ fontFamily: "Poppins", fontSize: 30 }}>{title}</div>
      <GapVertical times={10} />
    </div>
  );
}
