/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { GapHorizontal } from "../../components/GapHorizontal";
import { GapVertical } from "../../components/GapVertical";
import { LessonCard } from "../../components/LessonCard";

const allCourseData = [
  {
    title: "shapes",
    image: "/shapeHeader.png",
    description: "Let's learn about the world of shapes!",
    lessons: [
      {
        title: "The Square",
        background:
          "linear-gradient(198.46deg, #D2FFE2 12.51%, #99FFBC 79.66%)",
      },
      {
        title: "The Circle",
        background:
          "linear-gradient(198.46deg, #FFDDD2 12.51%, #FFD099 79.66%)",
      },
      {
        title: "The Triangle",
        background:
          "linear-gradient(198.46deg, #D2EFFF 12.51%, #99CEFF 79.66%)",
      },
    ],
  },
  {
    title: "colours",
    image: "/colourHeader.png",
    description: "Let's learn about the world of shapes!",
    lessons: [
      {
        title: "Green",
        background:
          "linear-gradient(198.46deg, #D2FFE2 12.51%, #99FFBC 79.66%)",
      },
      {
        title: "Orange",
        background:
          "linear-gradient(198.46deg, #FFDDD2 12.51%, #FFD099 79.66%)",
      },
      {
        title: "Blue",
        background:
          "linear-gradient(198.46deg, #D2EFFF 12.51%, #99CEFF 79.66%)",
      },
    ],
  },
];

export default function Course() {
  const router = useRouter();
  const { courseName } = router.query;

  if (courseName) {
    const courseData = allCourseData.filter((course) => {
      return course.title === courseName;
    })[0];
    return (
      <main css={{ width: "100vw", position: "relative" }}>
        <div css={{ position: "relative" }}>
          <div css={{ height: "45vh", width: "100%", position: "relative" }}>
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
            Lessons
          </div>
          <GapVertical times={4} />
          <div css={{ fontFamily: "Poppins", fontSize: 24, fontWeight: 200 }}>
            Choose a lesson to get started!
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
