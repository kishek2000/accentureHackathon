/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";

export function LessonCard({ title, background }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: background,
        height: 320,
        width: 280,
        borderRadius: 16,
      }}
    >
      <div css={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 36 }}>
        {title}
      </div>
      <GapVertical times={4} />
      <div
        css={{
          fontFamily: "Poppins",
          weight: 400,
          padding: "12px 24px",
          background: "white",
          borderRadius: 16,
          cursor: "pointer",
        }}
      >
        Start Lesson
      </div>
    </div>
  );
}
