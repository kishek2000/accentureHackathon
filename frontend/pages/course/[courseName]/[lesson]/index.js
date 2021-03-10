/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { useRouter } from "next/router";
import { GapVertical } from "../../../../components/GapVertical";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  getAllCourseLessonData,
  getCourseLessonData,
} from "../../../../api/Content";
import { ContentContext } from "../../../../context/ContentContext";

export default function Lesson() {
  const router = useRouter();
  const [question, setQuestion] = useState();
  const { courseName, lesson } = router.query;
  const { content, contentDispatch } = useContext(ContentContext);

  useEffect(async () => {
    if (lesson && courseName) {
      const allCourseLessonData = await getAllCourseLessonData();
      console.log(allCourseLessonData);
      contentDispatch({
        type: "populateQuestions",
        payload: allCourseLessonData,
      });
      localStorage.setItem(
        "content",
        JSON.stringify({ ...content, allCourseLessonData: allCourseLessonData })
      );
    }
  }, [lesson, courseName]);

  if (lesson && courseName) {
    if (question) {
      router.push(`/course/${courseName}/${lesson}/${question}`);
    }

    if (content.allCourseLessonData) {
      const lessonData = getCourseLessonData(
        courseName,
        lesson,
        content.allCourseLessonData
      );
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
          <p
            css={{
              position: "absolute",
              top: 36,
              fontFamily: "Poppins",
              color: "white",
              fontWeight: 600,
            }}
          >
            {lessonData.courseId.toUpperCase() +
              " - " +
              lessonData.lessonId.toUpperCase().replace("-", " ")}
          </p>
          <div
            css={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 64,
              alignSelf: "center",
              color: "white",
            }}
          >
            {lessonData.lessonTitle}
          </div>
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
              fontSize: 20,
              weight: 400,
              padding: "8px 28px",
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
    } else {
      <div css={{ fontSize: 400 }}>Loading lesson</div>;
    }
  }
  return null;
}
