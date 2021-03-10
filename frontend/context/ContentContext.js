import { createContext } from "react";

export const ContentContext = createContext(null);

export function contentDispatcher(state, action) {
  switch (action.type) {
    case "populateCourses" || "populateLessons":
      return {
        ...state,
        courseLessonData: action.payload,
      };
    case "populateQuestions":
      return {
        ...state,
        allCourseLessonData: action.payload,
      };
    case "reset":
      return {
        ...state,
        ...action.payload,
      };
    default:
      break;
  }
}
