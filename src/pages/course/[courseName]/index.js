/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { GapHorizontal } from "../../../components/GapHorizontal";
import { GapVertical } from "../../../components/GapVertical";
import { LessonCard } from "../../../components/LessonCard";
import Link from "next/link";
import { allCourseData } from "../../../store/courses";

function difficultyToStr(difficultyVal) {
  switch (difficultyVal) {
    case 1:
      return "trivial";
      break;
    case 2:
      return "easy";
      break;
    case 3:
      return "medium";
      break;
    case 4:
      return "hard";
      break;
    case 5:
      return "expert";
      break;
  }
}

function recommendationToStr(recommendedValue) {
  if (recommendedValue >= 0 && recommendedValue < 0.25) {
    return "Try if you dare"
  } else if (recommendedValue >= 0.25 && recommendedValue < 0.5) {
    return "Slightly recommended"
  } else if (recommendedValue >= 0.5 && recommendedValue < 0.75) {
    return "Recommended"
  } else if (recommendedValue >= 0.75 && recommendedValue < 1) {
    return "Highly recommended"
  }
}

// =====================================================
// RECOMMENDATION SYSTEM DRAFT

// lessons: array of objects of shape: { ..., difficulty }
// childData: object of shape { ..., attentionSpan,  }
function sortRecommendedLessons(lessons) {

}

/*
How to extend this with a deep learning model:

- The network receives data about the child's profile, historical performance data
  and the lesson data as input. Examples of parameters:
    - attention span                                       (eg. 2.3 minutes)
    - lesson difficulty                                    (eg. 1-5)
    - proficiency increase since last week                 (eg. 0.12 indicates a gain in proficiency by 12%)
    - time spent last week                                 (eg. 5.31 hrs)
    - number of prior attempts for this lesson             (eg. 3)
    - average accuracy over prior attempts on this lesson  (eg. 0.76)
- Output:
    Floating point number in range [0, 1] indicating how highly recommended this particular lesson is
    Eg. "The Square" has a recommendation value of 0.45
- Possible training procedure outline for this neural network:
    1. Get a large number of people to trial the app
    2. Feed them initially garbage recommendations
    3. Collect results on how those recommendations affected the child's improvement in proficiency per category
    4. Train the neural network model to find the recommendation value for each lesson that maximises
       their increase in proficiency over each category  
    5. Deploy the app
- Simple example architecture: 
    2-layer network with 6 input nodes, 12 hidden nodes, 1 output node with sigmoid activation



*/


// =====================================================


export default function Course() {
  const router = useRouter();
  const { courseName } = router.query;
  const [lesson, setLesson] = useState();

  if (courseName) {
    const courseData = allCourseData.filter((course) => {
      return course.title === courseName;
    })[0];

    const handleLessonCallback = useCallback((text) => {
      setLesson(text);
    });

    if (lesson) {
      router.push(`${courseName}/${lesson}`);
    }

    return (
      <main css={{ width: "100vw", position: "relative" }}>
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
        <div css={{ position: "relative" }}>
          <div
            css={{
              height: "45vh",
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
            Curated Lessons
          </div>
          <GapVertical times={1} />
          <div css={{ fontFamily: "Poppins", fontSize: 24, fontWeight: 300 }}>
            These are the lessons that will most benefit your child!
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
                  difficulty={difficultyToStr(lesson.difficulty)}
                  recommendation={recommendationToStr(lesson.recommendedValue)}
                  points={lesson.points}
                  handleLessonCallback={handleLessonCallback}
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
