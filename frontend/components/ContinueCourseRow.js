/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { CourseCard } from "./CourseCard";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

export function ContinueCourseRow() {
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
      }}
    >
      <div css={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 20 }}>
        Continue Course
      </div>
      <div
        css={{ fontFamily: "Poppins", fontWeight: 400, whiteSpace: "nowrap" }}
      >
        Pick up from right where you left off!
      </div>
      <GapVertical times={6} />
      <div css={{ display: "flex" }}>
        <CourseCard
          title="Shapes"
          thumbnail="/shapesThumbnail.png"
          handleCourseCallback={handleCourseCallback}
          keyVal={"shapes01"}
        />
      </div>
    </div>
  );
}
