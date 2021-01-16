/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { GapVertical } from "../../components/GapVertical";

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
        <GapVertical times={24} />
        {/* <div css={{ display: "flex",  }}>
          <div
            css={{
              fontFamily: "Poppins",
              fontSize: 48,
              alignSelf: "center",
            }}
          >
            Welcome Back!
          </div>
        </div> */}
      </main>
    );
  }
  return null;
}
