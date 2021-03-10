/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { GapHorizontal } from "./GapHorizontal";
import { CourseCard } from "./CourseCard";
import { allCourseData } from "../store/courses";
import { ContentContext } from "../context/ContentContext";
import { useContext } from "react";

export function AllCoursesRow() {
  const { content } = useContext(ContentContext);

  return (
    <div css={{ display: "flex", flexDirection: "column" }}>
      <div css={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 20 }}>
        All Courses
      </div>
      <div css={{ fontFamily: "Poppins", fontWeight: 400 }}>
        All of the courses offered by GalacticEd.
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
        }}
      >
        {content.courseLessonData.map((course, index) => (
          <>
            <CourseCard
              title={course.title}
              thumbnail={course.thumbnail}
              key={course.id}
              shadow={false}
            />
            {index !== content.courseLessonData.length - 1 && (
              <GapHorizontal times={6} />
            )}
          </>
        ))}
      </div>
    </div>
  );
}
