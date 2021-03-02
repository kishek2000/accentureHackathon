/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

export function IdentifyLesson({ questionData, setRevealItem }) {
  var places = ["20%", "35%", "50%", "65%", "80%"];

  if (questionData) {
    var dataMap = [];
    if (questionData.shapes) {
      dataMap = questionData.shapes;
    } else if (questionData.colours) {
      dataMap = questionData.colours;
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
          position: "relative",
        }}
      >
        {dataMap.map((shape) => (
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
              src={`/shapes/${shape.src}.png`}
              css={{
                filter: `hue-rotate(${shape.hue}deg)`,
                cursor: "pointer",
                width: 300,
              }}
              draggable={false}
              onClick={() => setRevealItem(true)}
            />
          </div>
        ))}
      </div>
    );
  }
  return null;
}
