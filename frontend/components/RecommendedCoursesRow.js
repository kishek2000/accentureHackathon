/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { GapHorizontal } from "./GapHorizontal";
import { CourseCard } from "./CourseCard";
import { allCourseData } from "../store/courses";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

export function RecommendedCoursesRow() {
  const [course, setCourse] = useState();
  const [childName, setChildName] = useState("");
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

  useEffect(() => {
    setChildName(JSON.parse(localStorage.getItem("currChild"))["name"]);
  });

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
        {childName}’s recommended courses in order of most recommended.
      </div>
      <GapVertical times={6} />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "85%",
          overflowX: "scroll",
          paddingBottom: 24,
          justifyContent: "space-between",
        }}
      >
        {allCourseData.map((course, index) => (
          <div
            key={index}
            css={{ paddingRight: index !== allCourseData.length - 1 ? 24 : 0 }}
          >
            <CourseCard
              key={course.title}
              title={course.title}
              thumbnail={course.thumbnail}
              keyVal={course.title}
              handleCourseCallback={handleCourseCallback}
              shadow={false}
            />
          </div>
        ))}
        <div css={{ width: 1, opacity: 0 }}>.</div>
      </div>
    </div>
  );
}
