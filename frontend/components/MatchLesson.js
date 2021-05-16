/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useCallback } from "react";
import { GapHorizontal } from "./GapHorizontal";
import { GapVertical } from "./GapVertical";
import mergeImages from "merge-images";
import { useState } from "react";
import * as themes from "../store/themes";

const imageSize = 20;

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

    var themeName = localStorage.getItem("theme");
    if (themeName === null) {
      themeName = "none";
    }

    var places = [];
    for (let i = 0; i < dataMap.length; i++) {
      let x;
      let y;
      let good = false;
      while (! good) {
        x = Math.floor(Math.random() * (100 - imageSize));
        y = 15 + Math.floor(Math.random() * (85 - imageSize));
        good = true;
        for (let i = 0; i < places.length; i++) {
          if (Math.abs(places[i][0] - x) < imageSize && Math.abs(places[i][1] - y) < imageSize) {
            good = false;
            break;
          }
        }
      }
      places.push([x, y]);

    }

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
          <div css={{ fontFamily: "Poppins", fontSize: 28, fontWeight: 400}}>
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
          {dataMap.map((media) => {
            let pos = places.splice(Math.floor(Math.random() * places.length), 1)[0];
            return (<div
              css={{
                position: "fixed",
                top: `${
                  pos[1] + Math.floor(Math.random() * (100 % imageSize)) + "%"
                }`,
                left: `${
                  pos[0] + Math.floor(Math.random() * (100 % imageSize)) + "%"
                }`,
              }}
            >
              <MergedImage
                mediaPrefix={mediaPrefix}
                media={media}
                onClickFunction={handleMatchSelection}
                correctMap={correctMap}
                themeImage={
                  themeName +
                  `/` +
                  themes[themeName][
                    Math.floor(Math.random() * themes[themeName].length)
                  ]
                }
              />
            </div>
          )})}
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
  if (mediaPrefix != `/shapes/` || themeImage == `none/none`) {
    return (
      <img
        src={`${mediaPrefix}${media.src}.png`}
        css={{
          filter: media.hue ? `hue-rotate(${media.hue}deg)` : null,
          cursor: "pointer",
          maxWidth: imageSize + "vw",
          maxHeight: imageSize + "vh",
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
        maxWidth: imageSize + "vw",
        maxHeight: imageSize + "vh",
        width: "auto",
        height: "auto",
      }}
      draggable={false}
      onClick={() => onClickFunction(media.src, correctMap.src)}
    />
  );
}
