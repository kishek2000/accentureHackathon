/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { GapVertical } from "../components/GapVertical";

export function CourseCard({ title, thumbnail, handleCourseCallback, shadow }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "white",
        boxShadow:
          shadow === false ? "" : "0px 4px 42px 7px rgba(213, 213, 213, 0.37)",
        borderRadius: 16,
        cursor: "pointer",
      }}
      onClick={() => handleCourseCallback(title)}
    >
      <img src={thumbnail} css={{ height: 200 }} />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          padding: "20px 0px",
          alignItems: "center",
        }}
      >
        <div css={{ fontFamily: "Poppins", fontSize: 18 }}>{title}</div>
      </div>
    </div>
  );
}
