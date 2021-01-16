/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { GapVertical } from "../components/GapVertical";
import { GapHorizontal } from "../components/GapHorizontal";
import { CourseCard } from "../components/CourseCard";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Stats } from "./Stats";

export function DashboardWindow({ courseList }) {
  const childName = "Jeremy";

  const [course, setCourse] = useState();
  const [stats, setStats] = useState(false);
  const handleCourseCallback = useCallback(
    (courseTitle) => {
      setCourse(courseTitle[0].toLowerCase() + courseTitle.slice(1));
    },
    [course]
  );

  const handleStatsCallback = useCallback(() => {
    setStats(true);
  });
  const router = useRouter();

  if (stats) {
    router.push(`/stats`);
  }

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
          SEE ALL >
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
      <GapVertical times={24} />
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
          Jeremy's Progress
        </div>
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: 20,
            alignSelf: "center",
            cursor: "pointer",
          }}
          onClick={() => handleStatsCallback()}
        >
          SEE ALL >
        </div>
      </div>
      <Stats />
    </div>
  );
}
