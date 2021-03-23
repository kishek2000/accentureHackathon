/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useCallback } from "react";
import { GapHorizontal } from "./GapHorizontal";
import { GapVertical } from "./GapVertical";

export function MatchLesson({
  questionData,
  setIsCorrect,
  questionTitle,
  handleIncorrectClick,
}) {
  if (questionData) {
    var dataMap = [];
    var correctMap = [];
    var mediaPrefix = "/shapes/";
    if (questionData.shapes) {
      dataMap = questionData.shapes;
      correctMap = questionData.correct.shape;
    } else if (questionData.colours) {
      dataMap = questionData.colours;
      correctMap = questionData.correct.colour;
    } else if (questionData.objects) {
      mediaPrefix = "/object-images/";
      dataMap = questionData.objects;
      correctMap = questionData.correct.object;
    } else if (questionData.emotions) {
      mediaPrefix = "/emotion-images/";
      dataMap = questionData.emotions[0];
      correctMap = questionData.correct.emotion[0];
    } else {
      return null;
    }
    const handleMatchSelection = useCallback((selection, correctSelection) => {
      if (selection === correctSelection) {
        setIsCorrect(true);
      }
    });
    const places = ["20%", "35%", "50%", "65%", "80%"];
    return (
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => handleIncorrectClick()}
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
            <strong
              css={{ fontFamily: "Poppins", fontSize: 28, fontWeight: 700 }}
            >
              {correctMap.title + "."}
            </strong>
          </div>
        </div>
        <GapVertical times={15} />
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: "100%",
            height: "60vh",
          }}
        >
          {dataMap.map((media) => (
            <div
              css={{
                position: "absolute",
                top: `${
                  places.splice(Math.floor(Math.random() * places.length), 1)[0]
                }`,
                left: `${
                  places.splice(Math.floor(Math.random() * places.length), 1)[0]
                }`,
              }}
            >
              <img
                src={`${mediaPrefix}${media.src}.png`}
                css={{
                  filter: media.hue ? `hue-rotate(${media.hue}deg)` : null,
                  cursor: "pointer",
                  width: 300,
                }}
                draggable={false}
                onClick={() => handleMatchSelection(media.src, correctMap.src)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}
