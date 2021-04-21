/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useCallback } from "react";
import { GapHorizontal } from "./GapHorizontal";
import { GapVertical } from "./GapVertical";
import mergeImages from "merge-images";
import { useState } from "react";
import { pets } from "../store/themes";

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

    const hplaces = ["6%", "20%", "34%", "48%", "62%", "76%", "88%"];
    const vplaces = ["12%", "20%", "34%", "48%", "62%", "76%", "88%"];

    /*TODO Grab this from somewhere*/
    var theme = pets;

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
                  vplaces.splice(
                    Math.floor(Math.random() * vplaces.length),
                    1
                  )[0]
                }`,
                left: `${
                  hplaces.splice(
                    Math.floor(Math.random() * hplaces.length),
                    1
                  )[0]
                }`,
              }}
            >
              <MergedImage
                mediaPrefix={mediaPrefix}
                media={media}
                onClickFunction={handleMatchSelection}
                correctMap={correctMap}
                themeImage={
                  `pets/` + theme[Math.floor(Math.random() * theme.length)]
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

function MergedImage({
  mediaPrefix,
  media,
  onClickFunction,
  correctMap,
  themeImage,
}) {
  if (mediaPrefix != `/shapes/`) {
    return (
      <img
        src={`${mediaPrefix}${media.src}.png`}
        css={{
          filter: media.hue ? `hue-rotate(${media.hue}deg)` : null,
          cursor: "pointer",
          maxWidth: "28vw",
          maxHeight: "28vh",
          width: "auto",
          height: "auto",
        }}
        draggable={false}
        onClick={() => onClickFunction(media.src, correctMap.src)}
      />
    );
  }
  const [imgSrc, setImgSrc] = useState(0);
  mergeImages([`${mediaPrefix}${media.src}.png`, `/themes/` + themeImage])
    .then((src) => {
      setImgSrc(src);
    })
    .catch((err) => console.log(err.toString()));
  return (
    <img
      src={imgSrc}
      css={{
        filter: media.hue ? `hue-rotate(${media.hue}deg)` : null,
        cursor: "pointer",
        maxWidth: "28vw",
        maxHeight: "28vh",
        width: "auto",
        height: "auto",
      }}
      draggable={false}
      onClick={() => onClickFunction(media.src, correctMap.src)}
    />
  );
}
