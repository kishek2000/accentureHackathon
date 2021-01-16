/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/react";
import { Router, useRouter } from "next/router";
import { GapVertical } from "./GapVertical";

// Will produce these colours on a FF0000 image that has been hue-rotated by these values
const RED = 0;
const ORANGE = 45;
const GREEN = 90;
const BLUE = 200;
const PINK = 300;

/*
const shapeData = {
    shapes: [
        {shape: "square", colour: 0},
        {shape: "circle", colour: 90},
        {shape: "triangle", colour: 200}
    ],
    correctShape: "square",
    difficulty: 1,
    averageTime: 3
}
*/

function Overlay({
  setCurrQuestion,
  currQuestion,
  setOverlay,
  returnToCourse,
  courseName,
}) {
  const router = useRouter();
  const [returnCourse, setReturnCourse] = useState(false);
  if (returnCourse) {
    router.push(returnToCourse);
  }
  return (
    <div
      css={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        background: "rgba(0,0,0,0.2)",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0038FF",
          width: 720,
          height: 500,
          borderRadius: 16,
        }}
      >
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: 64,
            fontWeight: 600,
            color: "white",
          }}
        >
          {!returnToCourse ? "Nice Work!" : "You Finished!"}
        </div>
        {returnToCourse ? (
          <>
            <GapVertical times={2} />
            <div
              css={{
                fontFamily: "Poppins",
                fontSize: 24,
                fontWeight: 300,
                color: "white",
                textAlign: "center",
                width: "80%",
              }}
            >
              Well done on completing the lesson. Click below to go back to{" "}
              {courseName}
            </div>
          </>
        ) : null}
        <GapVertical times={6} />
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: 24,
            fontWeight: 400,
            color: "black",
            cursor: "pointer",
            padding: "12px 24px",
            background: "white",
            borderRadius: 24,
          }}
          onClick={() => {
            if (returnToCourse) {
              setReturnCourse(true);
            } else {
              setCurrQuestion(currQuestion + 1);
              setOverlay(false);
            }
          }}
        >
          {"CONTINUE >"}
        </div>
      </div>
    </div>
  );
}

export function ShapeQuestion({
  shapeData,
  setCurrQuestion,
  currQuestion,
  returnToCourse,
  courseName,
}) {
  const [overlay, setOverlay] = useState(false);
  if (shapeData) {
    var places = [0, 300, 600, 900, 1200];
    var attempts = 0;
    return (
      <>
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
                }
              }}
            >
              <img
                src={`/shapes/${shape.shape}.png`}
                css={{
                  filter: `hue-rotate(${shape.colour}deg)`,
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
  return null;
}
