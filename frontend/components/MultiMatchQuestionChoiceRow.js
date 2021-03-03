/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "./GapHorizontal";

export function MultiMatchQuestionChoiceRow({
  choiceContent,
  lastIndex,
  choiceIndex,
  handleMatchSelection,
  correctMatch,
}) {
  return (
    <>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Poppins",
          fontSize: 20,
          background: "white",
          borderRadius: 16,
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          width: 250,
          height: 60,
        }}
        onClick={() => handleMatchSelection(choiceContent, correctMatch)}
      >
        {choiceContent}
      </div>
      {choiceIndex !== lastIndex - 1 && <GapHorizontal times={8} />}
    </>
  );
}
