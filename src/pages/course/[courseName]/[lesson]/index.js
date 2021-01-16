import { useRouter } from "next/router";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { lesson1, lesson2, lesson3 } from "../../../../store/data";
import { GapVertical } from "../../../../components/GapVertical";
import { useState } from "react";
import Link from "next/link";

export default function Lesson() {
  const router = useRouter();
  const [question, setQuestion] = useState();
  const { courseName, lesson } = router.query;
  if (lesson && courseName) {
    console.log(lesson);
    let lessonData;
    if (lesson.includes("Square")) {
      lessonData = lesson1;
    } else if (lesson.includes("Circle")) {
      lessonData = lesson2;
    } else {
      lessonData = lesson3;
    }

    if (question) {
      console.log(question);
      router.push(`/course/${courseName}/${lesson}/${question}`);
    }
    return (
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0038FF",
          height: "100vh",
        }}
      >
        <Link href={`/course/${courseName}`}>
          <p
            css={{
              color: "white",
              fontFamily: "Poppins",
              fontSize: 20,
              textDecoration: "none",
              cursor: "pointer",
              top: 36,
              left: 36,
              position: "absolute",
            }}
          >
            {"< Back"}
          </p>
        </Link>
        <div
          css={{
            fontFamily: "Poppins",
            fontWeight: 900,
            fontSize: 64,
            alignSelf: "center",
            color: "white",
          }}
        >
          {lessonData.lesson}
        </div>
        <GapVertical times={4} />
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: 36,
            alignSelf: "center",
            color: "white",
          }}
        >
          {lessonData.prompt}
        </div>
        <GapVertical times={12} />
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: 24,
            weight: 400,
            padding: "12px 48px",
            background: "white",
            borderRadius: 16,
            cursor: "pointer",
          }}
          onClick={() => {
            setQuestion(1);
          }}
        >
          BEGIN
        </div>
      </div>
    );
  }
  return null;
}
