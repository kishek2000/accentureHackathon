/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { useCallback, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { GapHorizontal } from "../../../components/GapHorizontal";
import { GapVertical } from "../../../components/GapVertical";
import { LessonCard } from "../../../components/LessonCard";

import { ContentContext } from "../../../context/ContentContext";

export default function Course() {
  const router = useRouter();
  const { courseName } = router.query;
  const [lesson, setLesson] = useState();
  const { content } = useContext(ContentContext);
  const handleLessonCallback = useCallback((text) => {
    setLesson(text);
  });

  if (courseName) {
    const courseData = content.courseLessonData.filter((course) => {
      return course.title === courseName;
    })[0];

    if (lesson) {
      router.push(`${courseName}/${lesson}`);
    }

    const courseTitle = courseName[0].toUpperCase() + courseName.slice(1);

    return (
      <main css={{ width: "100vw", position: "relative" }}>
        <div css={{ position: "absolute", zIndex: 3, left: 36, top: 36 }}>
          <Link href={"/dashboard"}>
            <p
              css={{
                color: "white",
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
        <div css={{ position: "relative" }}>
          <div
            css={{
              height: "40vh",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src={`${courseData.image}`}
              css={{ width: "100%", objectFit: "cover", height: "100%" }}
            />
          </div>
          <div
            css={{
              position: "absolute",
              bottom: 80,
              left: 120,
              zIndex: 2,
            }}
          >
            <div
              css={{
                fontFamily: "Poppins",
                color: "white",
                fontWeight: 700,
                fontSize: 64,
              }}
            >
              {courseTitle}
            </div>
            <div
              css={{
                color: "white",
                fontFamily: "Poppins",
                fontSize: 20,
                fontWeight: 300,
              }}
            >
              {courseData.description}
            </div>
          </div>
        </div>
        <GapVertical times={16} />
        <div css={{ marginLeft: 120 }}>
          <div
            css={{
              fontFamily: "Poppins",
              fontSize: 32,
              fontWeight: 600,
              alignSelf: "center",
            }}
          >
            Lessons
          </div>
          <GapVertical times={1} />
          <div css={{ fontFamily: "Poppins", fontSize: 24, fontWeight: 300 }}>
            Curated lessons in{" "}
            <span css={{ fontWeight: 700 }}>{courseTitle}</span> for Jeremy
          </div>
          <GapVertical times={8} />
          <div
            css={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {courseData.lessons.map((lesson) => (
              <>
                <LessonCard
                  title={lesson.title}
                  id={lesson.id}
                  description={lesson?.description}
                  level={lesson?.level}
                  background={lessonBackgroundMap[lesson?.level]}
                  handleLessonCallback={handleLessonCallback}
                />
                <GapHorizontal times={8} />
              </>
            ))}
          </div>
        </div>
      </main>
    );
  }
  return null;
}

export const lessonBackgroundMap = {
  1: "linear-gradient(198.46deg, #D3FFD2 12.51%, #ADFF99 79.66%)",
  2: "linear-gradient(198.46deg, #D2EFFF 12.51%, #99CEFF 79.66%)",
  3: "linear-gradient(198.46deg, #FFBEA3 40.49%, #FA965F 79.66%)",
  4: "linear-gradient(198.46deg, #FF8C8C 12.51%, #FF3434 79.66%)",
  5: "linear-gradient(198.46deg, #FD7171 12.51%, #C00101 79.66%)",
};
