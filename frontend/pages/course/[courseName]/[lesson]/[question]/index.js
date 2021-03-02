/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { coursesLessonData } from "../../../../../store/lessonData";
import { getCourseLessonData } from "../../../../../components/getCourseLessonData";
import { IdentifyLessonCorrect } from "../../../../../components/IdentifyLessonCorrect";
import { IdentifyLesson } from "../../../../../components/IdentifyLesson";
import { MatchLesson } from "../../../../../components/MatchLesson";
import { MatchLessonCorrect } from "../../../../../components/MatchLessonCorrect";

export default function Question() {
  const router = useRouter();
  const { courseName, lesson, question } = router.query;

  if (courseName && lesson && question) {
    const [currQuestion, setCurrQuestion] = useState(question);
    console.log(courseName, coursesLessonData);

    const lessonData = getCourseLessonData(courseName, lesson);
    const totalQuestions = lessonData.questions.length;
    const questionData = lessonData.questions[currQuestion - 1];

    const handleNextQuestion = useCallback(() => {
      if (currQuestion === totalQuestions) {
        setCurrQuestion(-1);
      } else {
        setCurrQuestion(Number(currQuestion) + 1);
      }
    }, [currQuestion]);

    useEffect(() => {
      if (currQuestion === -1) {
        router.push(`/course/${courseName}`);
      } else {
        router.push(`/course/${courseName}/${lesson}/${currQuestion}`);
      }
    }, [currQuestion]);

    switch (lessonData.lessonType) {
      case "identify":
        const [revealItem, setRevealItem] = useState(false);
        return revealItem ? (
          <IdentifyLessonCorrect
            setRevealItem={setRevealItem}
            correct={questionData.correct}
            handleNextQuestion={handleNextQuestion}
          />
        ) : (
          <IdentifyLesson
            questionData={questionData}
            setRevealItem={setRevealItem}
          />
        );
      case "match":
        const [isCorrect, setIsCorrect] = useState(false);
        return isCorrect ? (
          <MatchLessonCorrect
            setIsCorrect={setIsCorrect}
            correct={questionData.correct}
            handleNextQuestion={handleNextQuestion}
          />
        ) : (
          <MatchLesson
            setIsCorrect={setIsCorrect}
            questionData={questionData}
            questionTitle={lessonData.questionTitle}
          />
        );
      default:
        return (
          <div
            css={{ color: "black", fontWeight: 800, fontFamily: "Poppins" }}
            onClick={() => handleNextQuestion()}
          >
            next
            <div>{JSON.stringify(questionData)}</div>
          </div>
        );
    }
  }
  return null;
}
