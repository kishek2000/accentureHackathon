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
import { GapVertical } from "../../../../../components/GapVertical";

export default function Question() {
  const router = useRouter();
  const { courseName, lesson, question } = router.query;
  const { content } = useContext(ContentContext);

  if (courseName && lesson && question) {
    const [currQuestion, setCurrQuestion] = useState(Number(question));
    const [completed, setCompleted] = useState(false);

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
          num_incorrect: Math.max(clicks, 0),
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
        setCompleted(true);
        // router.push(`/course/${courseName}`);
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

    if (completed) {
      return <LessonCompleted lesson={lesson} courseName={courseName} />;
    } else if (lessonData) {
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
              handleIncorrectClick={handleIncorrectClick}
            />
          );
        case "match":
          return isCorrect ? (
            <MatchLessonCorrect
              setIsCorrect={setIsCorrect}
              correct={questionData.correct}
              handleNextQuestion={handleNextQuestion}
              handleCorrectClick={handleCorrectClick}
              handleIncorrectClick={handleIncorrectClick}
            />
          ) : (
            <MatchLesson
              setIsCorrect={setIsCorrect}
              questionData={questionData}
              questionTitle={lessonData.questionTitle}
              handleCorrectClick={handleCorrectClick}
              handleIncorrectClick={handleIncorrectClick}
            />
          );
        case "copy":
          return isDone ? (
            <CopyLessonDone
              setIsDone={setIsDone}
              correct={questionData.correct}
              handleNextQuestion={handleNextQuestion}
              handleCorrectClick={handleCorrectClick}
              handleIncorrectClick={handleIncorrectClick}
            />
          ) : (
            <CopyLesson
              setIsDone={setIsDone}
              questionData={questionData}
              questionTitle={lessonData.questionTitle}
              handleCorrectClick={handleCorrectClick}
              handleIncorrectClick={handleIncorrectClick}
            />
          );
        case "multi-match":
          return isCorrect ? (
            <MatchLessonCorrect
              setIsCorrect={setIsCorrect}
              correct={questionData.correct}
              handleNextQuestion={handleNextQuestion}
              handleCorrectClick={handleCorrectClick}
              handleIncorrectClick={handleIncorrectClick}
            />
          ) : (
            <MultiMatchLesson
              setIsCorrect={setIsCorrect}
              questionData={questionData}
              questionTitle={lessonData.questionTitle}
              handleCorrectClick={handleCorrectClick}
              handleIncorrectClick={handleIncorrectClick}
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

export function LessonCompleted({ lesson, courseName }) {
  const router = useRouter();
  const backToCourse = () => {
    localStorage.removeItem(`lessonStats:${lesson}`);
    router.push(`/course/${courseName}`);
  };

  return (
    <div
      css={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        zIndex: 6,
        top: 0,
        left: 0,
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          borderRadius: 16,
          width: "30%",
          height: "40%",
        }}
      >
        <GapVertical times={6} />
        <div css={{ fontSize: "36px" }}>🚀🎉</div>
        <div css={{ fontFamily: "Poppins", fontSize: "36px", fontWeight: 600 }}>
          Well Done!
        </div>
        <GapVertical times={2} />
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: 400,
            textAlign: "center",
            maxWidth: "90%",
          }}
        >
          You completed{" "}
          {lesson.replace("-", " ")[0].toUpperCase() +
            lesson.replace("-", " ").slice(1)}{" "}
          in {courseName[0].toUpperCase() + courseName.slice(1)}.
        </div>
        <GapVertical times={4} />
        <div
          css={{
            padding: "8px 16px",
            textTransform: "uppercase",
            background: "#0500FF",
            borderRadius: 16,
            fontSize: "16px",
            fontFamily: "Poppins",
            textTransform: "uppercase",
            cursor: "pointer",
            color: "white",
            fontWeight: 500,
          }}
          onClick={() => backToCourse()}
        >
          Back to {courseName}
        </div>
        <GapVertical times={6} />
      </div>
    </div>
  );
}
