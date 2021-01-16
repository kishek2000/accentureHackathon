/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { GapHorizontal } from "../../../components/GapHorizontal";
import { GapVertical } from "../../../components/GapVertical";
import { LessonCard } from "../../../components/LessonCard";
import Link from "next/link";
import { allCourseData } from "../../../store/courses";

export default function Course() {
  const router = useRouter();
  const { courseName } = router.query;
  const [lesson, setLesson] = useState();

  if (courseName) {
    const courseData = allCourseData.filter((course) => {
      return course.title === courseName;
    })[0];

    const handleLessonCallback = useCallback((text) => {
      setLesson(text);
    });

    if (lesson) {
      router.push(`${courseName}/${lesson}`);
    }

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
              height: "45vh",
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
              {courseName[0].toUpperCase() + courseName.slice(1)}
            </div>
            <GapVertical times={4} />
            <div css={{ color: "white", fontFamily: "Poppins", fontSize: 24 }}>
              {courseData.description}
            </div>
          </div>
        </div>
        <GapVertical times={24} />
        <div css={{ marginLeft: 120 }}>
          <div
            css={{
              fontFamily: "Poppins",
              fontSize: 48,
              alignSelf: "center",
            }}
          >
            Curated Lessons
          </div>
          <GapVertical times={1} />
          <div css={{ fontFamily: "Poppins", fontSize: 24, fontWeight: 300 }}>
            These are the lessons that will most benefit your child!
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
                  background={lesson.background}
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
