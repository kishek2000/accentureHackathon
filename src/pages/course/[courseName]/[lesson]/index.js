import { useRouter } from "next/router";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { lesson1 } from "../../../../store/data";
import { GapVertical } from "../../../../components/GapVertical";
import { useState } from "react";

export default function Lesson() {
  const router = useRouter();
  const [question, setQuestion] = useState();
  const { lesson } = router.query;
  if (lesson) {
    const lessonData = lesson1;
    if (question) {
      console.log(question);
      router.push(`${lesson}/${question}`);
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
