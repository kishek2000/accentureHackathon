/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "../components/GapVertical";
import { GapHorizontal } from "../components/GapHorizontal";
import { CourseCard } from "../components/CourseCard";
import { courses } from "../store/courses";

export default function Dashboard({ courseArr }) {
  console.log(courseArr);
  return (
    <main
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        margin: "0px 160px",
      }}
    >
      <DashboardWindow courseList={courseArr.courses} />
    </main>
  );
}

function DashboardWindow({ courseList }) {
  console.log(courseList);
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
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: 36,
          alignSelf: "center",
        }}
      >
        Courses
      </div>
      <GapVertical times={8} />
      <div
        css={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {courseList.map((i) => {
          return (
            <div>
              <CourseCard
                title={i.title}
                thumbnail={i.thumbnail}
                lesson={i.id}
              />
              <GapHorizontal times={6} />
            </div>
          );
        })}
      </div>
      <GapVertical times={24} />
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: 36,
          alignSelf: "center",
        }}
      >
        Liam's Progress
      </div>
    </div>
  );
}

Dashboard.getInitialProps = async (ctx) => {
  return { courseArr: courses };
};
