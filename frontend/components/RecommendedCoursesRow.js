/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { GapHorizontal } from "./GapHorizontal";
import { CourseCard } from "./CourseCard";
import { courses } from "../store/courses";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

export function RecommendedCoursesRow() {
  const [course, setCourse] = useState();
  const handleCourseCallback = useCallback(
    (courseTitle) => {
      setCourse(courseTitle[0].toLowerCase() + courseTitle.slice(1));
    },
    [course]
  );

  if (course) {
    const router = useRouter();
    router.push(`/course/${course}`);
  }
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div css={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 20 }}>
        Recommended Courses
      </div>
      <div css={{ fontFamily: "Poppins", fontWeight: 400 }}>
        Jeremy’s recommended courses in order of most recommended.
      </div>
      <GapVertical times={6} />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "75%",
          overflowX: "scroll",
          paddingBottom: 24,
        }}
      >
        {courses.courses.map((course, index) => (
          <>
            <CourseCard
              title={course.title}
              thumbnail={course.thumbnail}
              key={course.id}
              handleCourseCallback={handleCourseCallback}
              shadow={false}
            />
            <GapHorizontal times={6} />
          </>
        ))}
        <div css={{ width: 1, opacity: 0 }}>.</div>
      </div>
    </div>
  );
}
