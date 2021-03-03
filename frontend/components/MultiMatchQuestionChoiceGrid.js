/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { MultiMatchQuestionChoiceRow } from "./MultiMatchQuestionChoiceRow";

export function MultiMatchQuestionChoiceGrid({
  questionData,
  handleMatchSelection,
  correctMap,
}) {
  return (
    <>
      <div css={{ display: "flex", flexDirection: "row" }}>
        {questionData.choices.slice(0, 2).map((choice, index) => (
          <MultiMatchQuestionChoiceRow
            lastIndex={2}
            choiceContent={choice}
            choiceIndex={index}
            handleMatchSelection={handleMatchSelection}
            correctMatch={correctMap.title}
          />
        ))}
      </div>
      <GapVertical times={8} />
      <div css={{ display: "flex", flexDirection: "row" }}>
        {questionData.choices.slice(2, 4).map((choice, index) => (
          <MultiMatchQuestionChoiceRow
            lastIndex={2}
            choiceContent={choice}
            choiceIndex={index}
            handleMatchSelection={handleMatchSelection}
            correctMatch={correctMap.title}
          />
        ))}
      </div>
    </>
  );
}
