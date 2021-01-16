/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { GapVertical } from "../components/GapVertical";
import { GapHorizontal } from "../components/GapHorizontal";
import { CourseCard } from "../components/CourseCard";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Stats } from "./Stats";
import { AllTraits } from "./AllTraits";

export function DashboardWindow({ courseList }) {
  const childName = "Jeremy";

  const [course, setCourse] = useState();
  const handleCourseCallback = useCallback(
    (courseTitle) => {
      setCourse(courseTitle[0].toLowerCase() + courseTitle.slice(1));
    },
    [course]
  );

  const router = useRouter();

  if (course) {
    console.log(course);
    router.push(`/course/${course}`);
  }

  return (
    <div>
      <GapVertical times={35} />
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 900,
          fontSize: 64,
          alignSelf: "center",
        }}
      >
        Welcome Back!
      </div>
      <GapVertical times={12} />
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          css={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 36,
            alignSelf: "center",
          }}
        >
          Curated Courses
        </div>
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: 20,
            alignSelf: "center",
            cursor: "pointer",
          }}
        >
          {"SEE ALL >"}
        </div>
      </div>
      <GapVertical times={6} />
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 300,
          fontSize: 20,
        }}
      >
        Courses that we recommend will benefit your child the most.
      </div>
      <GapVertical times={8} />
      <div
        css={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {courseList.map((i) => (
          <>
            <CourseCard
              title={i.title}
              thumbnail={i.thumbnail}
              handleCourseCallback={handleCourseCallback}
            />
            <GapHorizontal times={6} />
          </>
        ))}
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          marginTop: 96,
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            paddingRight: 64,
            borderRight: "1px solid rgba(0,0,0,0.05)",
            width: "50%",
          }}
        >
          <div
            css={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 36,
            }}
          >
            Progress
          </div>
          <Stats />
        </div>
        <AllTraits childName={childName} />
      </div>
    </div>
  );
}
