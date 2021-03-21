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
import { postLessonStats } from "../../../../../api/Profile";

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
        const finalLessonStats = JSON.parse(
          localStorage.getItem(`lessonStats:${lesson}`)
        );
        const startTime = finalLessonStats["start_time"];
        const currTime = new Date().getTime();
        const elapsedTime = (currTime - startTime) / 1000;
        const updatedFinalLessonStats = {
          ...finalLessonStats,
          num_incorrect: clicks,
          time_taken: elapsedTime,
          completed: true,
        };

        console.log("Final Lesson Stats:", updatedFinalLessonStats);
        const {
          user_id,
          child_id,
          course_id,
          lesson_id,
          date,
          num_incorrect,
          time_taken,
        } = updatedFinalLessonStats;

        postLessonStats(
          user_id,
          child_id,
          course_id,
          lesson_id,
          date,
          num_incorrect,
          time_taken
        );

        localStorage.removeItem(`lessonStats:${lesson}`);
        alert(
          `You finished the lesson! Click ok to return back to lessons in ${courseName}.`
        );

        router.push(`/course/${courseName}`);
      } else {
        router.push(`/course/${courseName}/${lesson}/${currQuestion}`);
      }
    }, [currQuestion]);
    const [revealItem, setRevealItem] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isDone, setIsDone] = useState(false);

    /* All Lesson Stats state */
    const [clicks, setClicks] = useState(0);

    const handleCorrectClick = useCallback(() => {
      setClicks(clicks - 1);
    });

    const handleIncorrectClick = useCallback(() => {
      setClicks(clicks + 1);
    });

    if (lessonData) {
      switch (lessonData.lessonType) {
        case "identify":
          return revealItem ? (
            <IdentifyLessonCorrect
              setRevealItem={setRevealItem}
              correct={questionData.correct}
              handleNextQuestion={handleNextQuestion}
              handleCorrectClick={handleCorrectClick}
            />
          ) : (
            <IdentifyLesson
              questionData={questionData}
              setRevealItem={setRevealItem}
              handleCorrectClick={handleCorrectClick}
              handleIncorrectClick={handleIncorrectClick}
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
