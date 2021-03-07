/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useCallback } from "react";
import { GapVertical } from "./GapVertical";
import { GapHorizontal } from "./GapHorizontal";

export function CopyLessonDone({ correct, handleNextQuestion, setIsDone }) {
  const handleContinueLesson = useCallback(() => {
    handleNextQuestion();
    setIsDone(false);
  });
  var correctData = {};
  if (correct.action) {
    correctData = correct.action[0];
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
            src={`/action-videos/${correctData.src}`}
            css={{ width: 480 }}
            controls={true}
          />
        ) : (
          <audio src={`/action-audios/${correctData.src}`} controls={true} />
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
