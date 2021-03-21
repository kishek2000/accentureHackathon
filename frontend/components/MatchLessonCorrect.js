/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useCallback } from "react";
import { GapHorizontal } from "./GapHorizontal";
import { GapVertical } from "./GapVertical";

export function MatchLessonCorrect({
  handleCorrectClick,
  handleNextQuestion,
  setIsCorrect,
  correct,
}) {
  const handleContinueLesson = useCallback(() => {
    handleNextQuestion();
    handleCorrectClick();
    setIsCorrect(false);
  });
  var correctData = {};
  var sourcePrefix = "/shapes/";
  if (correct.shape) {
    correctData = correct.shape;
  } else if (correct.colour) {
    correctData = correct.colour;
  } else if (correct.action) {
    correctData = correct.action[0];
    sourcePrefix =
      correctData.contentType === "video"
        ? "/action-videos/"
        : "/action-images/";
  } else if (correct.object) {
    sourcePrefix = "/object-images/";
    correctData = correct.object;
  } else if (correct.emotion) {
    sourcePrefix = "/emotion-images/";
    correctData = correct.emotion[0];
  } else {
    return null;
  }
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        css={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {correctData.contentType === "video" ? (
          <video
            src={`${sourcePrefix}${correctData.src}`}
            css={{ width: 480 }}
            controls={true}
          />
        ) : (
          <img
            src={`${sourcePrefix}${correctData.src}.png`}
            css={{
              filter: correctData.hue
                ? `hue-rotate(${correctData.hue}deg)`
                : null,
              minHeight: 250,
              minWidth: 250,
              maxWidth: 400,
            }}
            draggable={false}
          />
        )}
        <GapHorizontal times={12} />
        <div css={{ display: "flex", flexDirection: "column" }}>
          <div css={{ fontFamily: "Poppins", fontSize: 48, fontWeight: 600 }}>
            {correct.commentTitle} 🎉
          </div>
          <div
            css={{
              display: "flex",
              flexDirection: "row",
              position: "relative",
            }}
          >
            <img
              src={"/playAudio.png"}
              css={{
                width: 16,
                height: 16,
                position: "absolute",
                left: -24,
                top: "50%",
                transform: "translate(0%, -50%)",
                cursor: "pointer",
              }}
            />
            <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 300 }}>
              {correct.subTitle}{" "}
              <strong
                css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 700 }}
              >
                {correctData.title +
                  correct.commentTitle[correct.commentTitle.length - 1]}
              </strong>
            </div>
          </div>
          <GapVertical times={2} />
          <div
            css={{ fontFamily: "Poppins", fontSize: 16, cursor: "pointer" }}
            onClick={() => handleContinueLesson()}
          >
            {"CONTINUE >"}
          </div>
        </div>
      </div>
    </div>
  );
}
