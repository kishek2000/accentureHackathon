import {
  actionsLessonFive,
  actionsLessonFour,
  actionsLessonOne,
  actionsLessonThree,
  actionsLessonTwo,
} from "./lessons/actions";
import {
  coloursLessonFive,
  coloursLessonFour,
  coloursLessonOne,
  coloursLessonThree,
  coloursLessonTwo,
} from "./lessons/colours";
import {
  emotionsLessonFive,
  emotionsLessonFour,
  emotionsLessonOne,
  emotionsLessonThree,
  emotionsLessonTwo,
} from "./lessons/emotions";
import {
  objectsLessonFive,
  objectsLessonFour,
  objectsLessonOne,
  objectsLessonThree,
  objectsLessonTwo,
} from "./lessons/objects";
import {
  shapesLessonOne,
  shapesLessonTwo,
  shapesLessonThree,
  shapesLessonFour,
} from "./lessons/shapes";

export const coursesLessonData = [
  {
    courseId: "shapes",
    lessons: [
      { ...shapesLessonOne },
      { ...shapesLessonTwo },
      { ...shapesLessonThree },
      { ...shapesLessonFour },
    ],
  },
  {
    courseId: "colours",
    lessons: [
      { ...coloursLessonOne },
      { ...coloursLessonTwo },
      { ...coloursLessonThree },
      { ...coloursLessonFour },
      { ...coloursLessonFive },
    ],
  },
  {
    courseId: "actions",
    lessons: [
      { ...actionsLessonOne },
      { ...actionsLessonTwo },
      { ...actionsLessonThree },
      { ...actionsLessonFour },
      { ...actionsLessonFive },
    ],
  },
  {
    courseId: "objects",
    lessons: [
      { ...objectsLessonOne },
      { ...objectsLessonTwo },
      { ...objectsLessonThree },
      { ...objectsLessonFour },
      { ...objectsLessonFive },
    ],
  },
  {
    courseId: "emotions",
    lessons: [
      { ...emotionsLessonOne },
      { ...emotionsLessonTwo },
      { ...emotionsLessonThree },
      { ...emotionsLessonFour },
      { ...emotionsLessonFive },
    ],
  },
];
