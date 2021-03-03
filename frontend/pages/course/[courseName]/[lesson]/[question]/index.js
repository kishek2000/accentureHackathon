/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { getCourseLessonData } from "../../../../../components/getCourseLessonData";
import { IdentifyLessonCorrect } from "../../../../../components/IdentifyLessonCorrect";
import { IdentifyLesson } from "../../../../../components/IdentifyLesson";
import { MatchLesson } from "../../../../../components/MatchLesson";
import { MatchLessonCorrect } from "../../../../../components/MatchLessonCorrect";
import { CopyLesson } from "../../../../../components/CopyLesson";
import { CopyLessonDone } from "../../../../../components/CopyLessonDone";
import { MultiMatchLesson } from "../../../../../components/MultiMatchLesson";

export default function Question() {
  const router = useRouter();
  const { courseName, lesson, question } = router.query;

  if (courseName && lesson && question) {
    const [currQuestion, setCurrQuestion] = useState(Number(question));

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
        console.log("returning to course");
        router.push(`/course/${courseName}`);
      } else {
        router.push(`/course/${courseName}/${lesson}/${currQuestion}`);
      }
    }, [currQuestion]);
    const [revealItem, setRevealItem] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isDone, setIsDone] = useState(false);

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
  }
  return null;
}
