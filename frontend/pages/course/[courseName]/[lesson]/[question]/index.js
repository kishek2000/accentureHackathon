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
import { GapVertical } from "../../../../../components/GapVertical";
import { GapHorizontal } from "../../../../../components/GapHorizontal";

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

export function MultiMatchLesson({
  setIsCorrect,
  questionData,
  questionTitle,
}) {
  if (questionData) {
    var prompt = null;
    var correctMap = [];
    if (questionData.actions) {
      prompt = questionData.actions[0];
      correctMap = questionData.correct.action[0];
    } else {
      return null;
    }

    const handleMatchSelection = useCallback((selection, correctSelection) => {
      console.log(selection, correctSelection);
      if (selection === correctSelection) {
        setIsCorrect(true);
      }
    });

    return (
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "85vh",
        }}
      >
        <GapVertical times={24} />
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -24,
          }}
        >
          <img
            src={"/playAudio.png"}
            css={{
              width: 36,
              height: 36,
              cursor: "pointer",
            }}
          />
          <GapHorizontal times={3} />
          <div css={{ fontFamily: "Poppins", fontSize: 28, fontWeight: 400 }}>
            {questionTitle}
          </div>
        </div>
        <GapVertical times={15} />
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <div>
            {prompt.contentType === "video" ? (
              <video
                src={`/action-videos/${prompt.src}`}
                css={{ width: 500 }}
                controls={true}
              />
            ) : (
              <img
                src={`/action-images/${prompt.src}.png`}
                css={{
                  width: 500,
                }}
                draggable={false}
              />
            )}
          </div>
          <GapVertical times={12} />
          <MultiMatchQuestionChoiceGrid
            questionData={questionData}
            handleMatchSelection={handleMatchSelection}
            correctMap={correctMap}
          />
        </div>
      </div>
    );
  }
  return null;
}

export function MultiMatchQuestionChoiceGrid({
  questionData,
  handleMatchSelection,
  correctMap,
}) {
  return (
    <>
      <div css={{ display: "flex", flexDirection: "row" }}>
        {questionData.choices.slice(0, 2).map((choice, index) => (
          <MultiMatchQuestionChoiceRow
            lastIndex={2}
            choiceContent={choice}
            choiceIndex={index}
            handleMatchSelection={handleMatchSelection}
            correctMatch={correctMap.title}
          />
        ))}
      </div>
      <GapVertical times={8} />
      <div css={{ display: "flex", flexDirection: "row" }}>
        {questionData.choices.slice(2, 4).map((choice, index) => (
          <MultiMatchQuestionChoiceRow
            lastIndex={2}
            choiceContent={choice}
            choiceIndex={index}
            handleMatchSelection={handleMatchSelection}
            correctMatch={correctMap.title}
          />
        ))}
      </div>
    </>
  );
}

export function MultiMatchQuestionChoiceRow({
  choiceContent,
  lastIndex,
  choiceIndex,
  handleMatchSelection,
  correctMatch,
}) {
  return (
    <>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Poppins",
          fontSize: 20,
          background: "white",
          borderRadius: 16,
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          width: 250,
          height: 60,
        }}
        onClick={() => handleMatchSelection(choiceContent, correctMatch)}
      >
        {choiceContent}
      </div>
      {choiceIndex !== lastIndex - 1 && <GapHorizontal times={8} />}
    </>
  );
}
