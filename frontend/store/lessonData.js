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
];
