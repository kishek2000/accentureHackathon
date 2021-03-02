/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect } from "react";
import { Overlay } from "./Overlay";
import { playSFX } from "./playSFX";
import Link from "next/link";

export function ShapeQuestion({
  shapeData,
  setCurrQuestion,
  currQuestion,
  returnToCourse,
  courseName,
  lesson,
}) {
  const [overlay, setOverlay] = useState(false);
  if (shapeData) {
    var places = [0, 300, 600, 900, 1200];
    var attempts = 0;
    return (
      <>
        <Back courseName={courseName} lesson={lesson} />
        <div css={{ position: "relative" }}>
          {shapeData.shapes.map((shape) => (
            <div
              css={{
                position: "absolute",
                left: `${
                  places.splice(Math.floor(Math.random() * places.length), 1)[0]
                }px`,
                top: 200,
              }}
              onClick={() => {
                attempts++;
                if (shape.shape == shapeData.correctShape) {
                  console.log("Hurrah!");
                  // setCurrQuestion(currQuestion + 1);
                  setOverlay(true);
                  playSFX();
                }
              }}
            >
              <img
                src={`/shapes/${shape.shape}.png`}
                css={{
                  filter: `hue-rotate(${shape.hue}deg)`,
                  width: 400,
                  height: 400,
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>
        {overlay ? (
          <Overlay
            setCurrQuestion={setCurrQuestion}
            currQuestion={currQuestion}
            setOverlay={setOverlay}
          />
        ) : null}
      </>
    );
  } else {
    return <Overlay returnToCourse={returnToCourse} courseName={courseName} />;
  }
}

function Back({ courseName, lesson }) {
  return (
    <div css={{ position: "absolute", zIndex: 3, left: 36, top: 36 }}>
      <Link href={`/course/${courseName}/${lesson}`}>
        <p
          css={{
            color: "black",
            fontFamily: "Poppins",
            fontSize: 20,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {"< Back"}
        </p>
      </Link>
    </div>
  );
}
