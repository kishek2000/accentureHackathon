/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useCallback } from "react";
import { GapVertical } from "./GapVertical";
import { GapHorizontal } from "./GapHorizontal";
import { MultiMatchQuestionChoiceGrid } from "./MultiMatchQuestionChoiceGrid";

export function MultiMatchLesson({
  setIsCorrect,
  questionData,
  questionTitle,
}) {
  if (questionData) {
    var prompt = null;
    var correctMap = [];
    var mediaPrefix;
    if (questionData.actions) {
      prompt = questionData.actions[0];
      correctMap = questionData.correct.action[0];
      mediaPrefix =
        questionData.contentType === "video"
          ? "/action-videos/"
          : "/action-images/";
    } else if (questionData.emotions) {
      prompt = questionData.emotions[0];
      correctMap = questionData.correct.emotion[0];
      mediaPrefix = "/emotion-images/";
    } else {
      return null;
    }

    const handleMatchSelection = useCallback((selection, correctSelection) => {
      console.log(selection, correctSelection);
      if (selection === correctSelection) {
        setIsCorrect(true);
      }
    });

    return (
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "85vh",
        }}
      >
        <GapVertical times={24} />
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -24,
          }}
        >
          <img
            src={"/playAudio.png"}
            css={{
              width: 36,
              height: 36,
              cursor: "pointer",
            }}
          />
          <GapHorizontal times={3} />
          <div css={{ fontFamily: "Poppins", fontSize: 28, fontWeight: 400 }}>
            {questionTitle}
          </div>
        </div>
        <GapVertical times={15} />
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <div>
            {prompt.contentType === "video" ? (
              <video
                src={`${mediaPrefix}${prompt.src}`}
                css={{ width: 500 }}
                controls={true}
              />
            ) : (
              <img
                src={`${mediaPrefix}${prompt.src}.png`}
                css={{
                  width: 400,
                }}
                draggable={false}
              />
            )}
          </div>
          <GapVertical times={12} />
          <MultiMatchQuestionChoiceGrid
            questionData={questionData}
            handleMatchSelection={handleMatchSelection}
            correctMap={correctMap}
          />
        </div>
      </div>
    );
  }
  return null;
}
