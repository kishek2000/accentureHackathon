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
  recommended,
}) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: background,
        boxShadow: recommended
          ? "0px 4px 42px 7px rgba(0,0,0, 0.15)"
          : "0px 4px 42px 7px rgba(213, 213, 213, 0.6)",
        width: recommended ? 300 : 240,
        height: recommended ? 350 : 280,
        borderRadius: 16,
        position: "relative",
      }}
      key={id}
    >
      <GapVertical times={2} />
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 700,
          fontSize: recommended ? 28 : 24,
        }}
      >
        Level {level}
      </div>
      <GapVertical times={3} />
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: recommended ? 22 : 18,
          textAlign: "center",
          width: "90%",
          // whiteSpace: "nowrap",
        }}
      >
        {title}
      </div>
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 300,
          fontSize: recommended ? 18 : 14,
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
          fontSize: recommended ? 16 : 12,
          weight: recommended ? 480 : 400,
          padding: "8px 24px",
          background: "white",
          borderRadius: 16,
          cursor: "pointer",
        }}
        onClick={() => handleLessonCallback(id)}
      >
        Start Lesson
      </div>
      <GapVertical times={4} />
      {recommended && (
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: 20,
            fontWeight: 800,
            position: "absolute",
            bottom: "-48px",
          }}
        >
          RECOMMENDED
        </div>
      )}
    </div>
  );
}
