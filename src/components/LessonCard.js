/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "./GapHorizontal";
import { GapVertical } from "./GapVertical";

export function LessonCard({ title, background, handleLessonCallback, points, difficulty, recommendation }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: background,
        boxShadow: "0px 4px 42px 7px rgba(213, 213, 213, 0.6)",
        height: 320,
        width: 280,
        borderRadius: 16,
        position: "relative",
      }}
    >
      <div
        css={{
          position: "absolute",
          display: "flex",
          top: 24,
          flexDirection: "row",
        }}
      >
        <img
          src="/medal.png"
          css={{ height: 20, width: 20, objectFit: "contain" }}
        />
        <GapHorizontal times={1} />
        <div css={{ fontFamily: "Poppins", fontSize: 16, color: "black" }}>
          <strong>{points}</strong> Points
        </div>
      </div>
      <div css={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 36 }}>
        {title}
      </div>
      <div>Difficulty: <strong>{difficulty}</strong></div>
      <div><em><strong style={{"fontSize": "150%"}}>{recommendation}</strong></em></div>
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
        onClick={() => handleLessonCallback(title)}
      >
        Start Lesson
      </div>
    </div>
  );
}
