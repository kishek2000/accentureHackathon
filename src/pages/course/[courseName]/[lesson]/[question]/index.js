import { useRouter } from "next/router";
import { useState } from "react";
import { ShapeQuestion } from "../../../../../components/LessonContent";
import { lesson1, lesson2, lesson3 } from "../../../../../store/data";

export default function Question() {
  const router = useRouter();
  const { courseName, lesson, question } = router.query;
  const returnToCourse = `/course/${courseName}`;
  if (courseName && lesson && question) {
    const [currQuestion, setCurrQuestion] = useState(question - 1);
    let lessonData;
    if (lesson.includes("Square")) {
      lessonData = lesson1;
    } else if (lesson.includes("Circle")) {
      lessonData = lesson2;
    } else {
      lessonData = lesson3;
    }
    const data = lessonData.questions[currQuestion];
    return (
      <ShapeQuestion
        shapeData={data}
        setCurrQuestion={setCurrQuestion}
        currQuestion={currQuestion}
        returnToCourse={returnToCourse}
      />
    );
  }
  return null;
}
