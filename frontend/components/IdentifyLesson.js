/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import mergeImages from "merge-images";
import { useState } from "react";
import * as themes from "../store/themes";

export function IdentifyLesson({
  questionData,
  setRevealItem,
  handleIncorrectClick,
}) {
  const hplaces = ["6%", "20%", "34%", "48%", "62%", "76%", "90%"];
  const vplaces = ["12%", "20%", "34%", "48%", "62%", "76%", "88%"];

  if (questionData) {
    var dataMap = [];
    var mediaPrefix = "/shapes/";
    if (questionData.shapes) {
      dataMap = questionData.shapes;
    } else if (questionData.colours) {
      dataMap = questionData.colours;
    } else if (questionData.objects) {
      dataMap = questionData.objects;
      mediaPrefix = "/object-images/";
    } else if (questionData.emotions) {
      dataMap = questionData.emotions;
      mediaPrefix = "/emotion-images/";
    } else {
      return null;
    }

    var themeName = localStorage.getItem("theme");
    if (themeName === null) {
      themeName = "none";
    }

    return (
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}
        onClick={() => handleIncorrectClick()}
      >
        {dataMap.map((media) => (
          <div
            css={{
              position: "fixed",
              top: `${
                vplaces.splice(Math.floor(Math.random() * vplaces.length), 1)[0]
              }`,
              left: `${
                hplaces.splice(Math.floor(Math.random() * hplaces.length), 1)[0]
              }`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <MergedImage
              mediaPrefix={mediaPrefix}
              media={media}
              onClickFunction={setRevealItem}
              themeImage={
                themeName +
                `/` +
                themes[themeName][
                  Math.floor(Math.random() * themes[themeName].length)
                ]
              }
            />
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function MergedImage({ mediaPrefix, media, onClickFunction, themeImage }) {
  if (mediaPrefix != `/shapes/` || themeImage == `none/none`) {
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
        onClick={() => {
          onClickFunction(true);
        }}
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
      onClick={() => {
        onClickFunction(true);
      }}
    />
  );
}
