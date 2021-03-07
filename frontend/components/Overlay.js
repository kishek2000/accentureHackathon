/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { GapVertical } from "./GapVertical";

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
export function Overlay({
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
              Well done on completing the lesson. Why don't you take a break!
              Click below to go back.
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
            borderRadius: 16,
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
