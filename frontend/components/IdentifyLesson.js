/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

export function IdentifyLesson({
  questionData,
  setRevealItem,
  handleIncorrectClick,
}) {
  var places = ["20%", "35%", "50%", "65%", "80%"];

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

    console.log("rendering component again");

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
                places.splice(Math.floor(Math.random() * places.length), 1)[0]
              }`,
              left: `${
                places.splice(Math.floor(Math.random() * places.length), 1)[0]
              }`,
              transform: "translate(-50%, -50%)",
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
              onClick={() => {
                setRevealItem(true);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
  return null;
}
