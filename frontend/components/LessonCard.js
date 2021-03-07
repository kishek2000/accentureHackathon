/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "./GapHorizontal";
import { GapVertical } from "./GapVertical";

export function LessonCard({
  level,
  title,
  description,
  background,
  handleLessonCallback,
  id,
}) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: background,
        boxShadow: "0px 4px 42px 7px rgba(213, 213, 213, 0.6)",
        width: 240,
        height: 280,
        borderRadius: 16,
        position: "relative",
      }}
      key={id}
    >
      <GapVertical times={2} />
      <div css={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 24 }}>
        Level {level}
      </div>
      <GapVertical times={3} />
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          width: "90%",
        }}
      >
        {title}
      </div>
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 300,
          fontSize: 14,
          textAlign: "center",
          width: "85%",
          height: "20%",
        }}
      >
        {description}
      </div>
      <GapVertical times={4} />
      <div
        css={{
          fontFamily: "Poppins",
          fontSize: 12,
          weight: 400,
          padding: "8px 24px",
          background: "white",
          borderRadius: 16,
          cursor: "pointer",
        }}
        onClick={() => handleLessonCallback(id)}
      >
        Start Lesson
      </div>
    </div>
  );
}
