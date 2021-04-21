/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { GapHorizontal } from "../../../components/GapHorizontal";
import { GapVertical } from "../../../components/GapVertical";
import { LessonCard } from "../../../components/LessonCard";

import { ContentContext } from "../../../context/ContentContext";
import { HeaderProfile } from "../../../components/HeaderProfile";
import { getRecommendedLesson } from "../../../api/Recommendation";
import { getCourseProgress, getLessonStats } from "../../../api/Profile";

export default function Course() {
  const router = useRouter();
  const { courseName } = router.query;
  const [lesson, setLesson] = useState();
  const [recommendedLessonId, setRecommendedLessonId] = useState();
  const { content } = useContext(ContentContext);
  const handleLessonCallback = useCallback((text) => {
    setLesson(text);
  });

  const [childName, setChildName] = useState("");

  const getRecommended = useCallback(async () => {
    const childId = JSON.parse(localStorage.getItem("currChild"))["_id"];
    const userId = JSON.parse(localStorage.getItem("user"))["user_id"];
    const courseId = courseName;
    const recommendedLessonId = await getRecommendedLesson(
      courseId,
      userId,
      childId
    );
    setRecommendedLessonId(recommendedLessonId);
  });

  useEffect(() => {
    setChildName(JSON.parse(localStorage.getItem("currChild"))["name"]);
    if (courseName) {
      const childId = JSON.parse(localStorage.getItem("currChild"))["_id"];
      const userId = JSON.parse(localStorage.getItem("user"))["user_id"];
      const courseId = courseName;

      getCourseProgress(userId, childId, courseId)
        .then((data) => setCourseProgress(data))
        .catch((err) => console.log(err));
    }
  }, [courseName]);

  const [courseProgress, setCourseProgress] = useState({});

  if (courseName) {
    getRecommended();
    const courseData = content.courseLessonData.filter((course) => {
      return course.title === courseName;
    })[0];

    if (lesson) {
      router.push(`${courseName}/${lesson}`);
    }

    const courseTitle = courseName[0].toUpperCase() + courseName.slice(1);

    return (
      <>
        <main
          css={{
            width: "100vw",
            height: "100vh",
            overflowX: "hidden",
            position: "relative",
          }}
        >
          <HeaderProfile route={true} />
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
          <CourseHeaderDescription
            courseData={courseData}
            courseTitle={courseTitle}
          />
          <GapVertical times={12} />
          <div
            css={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              marginLeft: "120px",
            }}
          >
            <CourseLessons
              courseTitle={courseTitle}
              childName={childName}
              courseData={courseData}
              handleLessonCallback={handleLessonCallback}
              recommendedLessonId={recommendedLessonId}
            />
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                alignItems: "flex-start",
              }}
            >
              <div
                css={{
                  fontFamily: "Poppins",
                  fontSize: 32,
                  fontWeight: 600,
                }}
              >
                Progress
              </div>
              <GapVertical times={1} />
              <div
                css={{ fontFamily: "Poppins", fontSize: 22, fontWeight: 300 }}
              >
                {childName}'s progress in{" "}
                <span css={{ fontWeight: 700 }}>{courseTitle}</span>.
              </div>
              <GapVertical times={4} />
              {Object.keys(courseProgress).length > 0 ? (
                <div
                  css={{
                    width: "90%",
                    height: "48px",
                    borderRadius: "24px",
                    background: "rgba(248, 248, 248)",
                    position: "relative",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex",
                    fontFamily: "Poppins",
                  }}
                >
                  <div
                    css={{
                      width: `${
                        courseProgress.progress === 2
                          ? 0
                          : Math.round(courseProgress.progress * 100)
                      }%`,
                      height: "48px",
                      borderRadius: "24px",
                      background:
                        "linear-gradient(198.46deg, #ADFF99 12.51%, #D3FFD2 79.66%)",
                      position: "absolute",
                      left: "0px",
                      top: "0px",
                      zIndex: 0,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {courseProgress.progress !== 0 ? (
                      <p
                        css={{
                          margin: 0,
                          paddingRight: "24px",
                          fontWeight: 700,
                        }}
                      >
                        {Math.round(courseProgress.progress * 100)}%
                      </p>
                    ) : null}
                  </div>
                  <p
                    css={{
                      margin: 0,
                      zIndex: 1,
                      paddingLeft: "24px",
                      textTransform: "uppercase",
                      fontSize: "14px",
                      fontWeight: 500,
                      marginTop: "84px",
                      marginLeft: "-24px",
                    }}
                  >
                    {courseProgress.next_lesson
                      .split("-")
                      .map((string, index) => {
                        if (string) {
                          if (index === 1) {
                            console.log(Number(string));
                            return `${Number(string) - 1}`;
                          }
                          return string;
                        }
                        return recommendedLessonId.split("-").join(" ");
                      })
                      .join(" ")}
                  </p>
                  <p
                    css={{
                      margin: 0,
                      zIndex: 1,
                      paddingRight: "24px",
                      textTransform: "uppercase",
                      fontSize: "14px",
                      fontWeight: 500,
                      marginTop: "84px",
                      marginRight: "-24px",
                    }}
                  >
                    {courseProgress.next_lesson
                      .split("-")
                      .map((string) => {
                        if (string) {
                          return string;
                        }
                        return `END OF ${courseName}`;
                      })
                      .join(" ")}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </>
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

function CourseLessons({
  courseTitle,
  childName,
  courseData,
  handleLessonCallback,
  recommendedLessonId,
}) {
  return (
    <div css={{ width: "50%" }}>
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
      <div css={{ fontFamily: "Poppins", fontSize: 22, fontWeight: 300 }}>
        Curated lessons in <span css={{ fontWeight: 700 }}>{courseTitle}</span>{" "}
        for {childName}
      </div>
      <GapVertical times={8} />
      <div
        css={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "repeat(auto-fill, 260px)",
          gridGap: "80px 24px",
        }}
      >
        {courseData.lessons.map((lesson) => (
          <LessonCard
            title={lesson.title}
            id={lesson.id}
            description={lesson?.description}
            level={lesson?.level}
            background={lessonBackgroundMap[lesson?.level]}
            handleLessonCallback={handleLessonCallback}
            recommended={lesson.id === recommendedLessonId}
          />
        ))}
      </div>
      <GapVertical times={20} />
    </div>
  );
}

function CourseHeaderDescription({ courseData, courseTitle }) {
  return (
    <div
      css={{
        position: "relative",
      }}
    >
      <div
        css={{
          height: "38vh",
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
  );
}
