/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/react";
import { Router, useRouter } from "next/router";

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

export function ShapeQuestion({
  shapeData,
  setCurrQuestion,
  currQuestion,
  returnToCourse,
}) {
  if (shapeData) {
    var places = [0, 300, 600, 900, 1200];
    var attempts = 0;
    return (
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
                // let getData = localStorage.getItem("stats");
                // if (getData !== "" && getData !== null) {
                //   stats = JSON.parse(getData);
                // } else {
                //   stats = {};
                // }

                // localStorage.setItem("stats", JSON.stringify(stats));
                // const date = new Date();
                // const currTime = date.getTime();
                console.log("Hurrah!");
                setCurrQuestion(currQuestion + 1);
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
    );
  } else {
    const router = useRouter();
    router.push(returnToCourse);
  }
  return null;
}
