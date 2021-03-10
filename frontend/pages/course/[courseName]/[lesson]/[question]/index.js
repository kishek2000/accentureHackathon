/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";

import { IdentifyLessonCorrect } from "../../../../../components/IdentifyLessonCorrect";
import { IdentifyLesson } from "../../../../../components/IdentifyLesson";
import { MatchLesson } from "../../../../../components/MatchLesson";
import { MatchLessonCorrect } from "../../../../../components/MatchLessonCorrect";
import { CopyLesson } from "../../../../../components/CopyLesson";
import { CopyLessonDone } from "../../../../../components/CopyLessonDone";
import { MultiMatchLesson } from "../../../../../components/MultiMatchLesson";
import { getCourseLessonData } from "../../../../../api/Content";
import { ContentContext } from "../../../../../context/ContentContext";

export default function Question() {
  const router = useRouter();
  const { courseName, lesson, question } = router.query;
  const { content } = useContext(ContentContext);

  if (courseName && lesson && question) {
    const [currQuestion, setCurrQuestion] = useState(Number(question));

    const lessonData = getCourseLessonData(
      courseName,
      lesson,
      content.allCourseLessonData
    );
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
    const [revealItem, setRevealItem] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isDone, setIsDone] = useState(false);
    if (lessonData) {
      switch (lessonData.lessonType) {
        case "identify":
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
        case "copy":
          return isDone ? (
            <CopyLessonDone
              setIsDone={setIsDone}
              correct={questionData.correct}
              handleNextQuestion={handleNextQuestion}
            />
          ) : (
            <CopyLesson
              setIsDone={setIsDone}
              questionData={questionData}
              questionTitle={lessonData.questionTitle}
            />
          );
        case "multi-match":
          return isCorrect ? (
            <MatchLessonCorrect
              setIsCorrect={setIsCorrect}
              correct={questionData.correct}
              handleNextQuestion={handleNextQuestion}
            />
          ) : (
            <MultiMatchLesson
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
    } else {
      return <div>Loading Lesson</div>;
    }
  }
  return null;
}
