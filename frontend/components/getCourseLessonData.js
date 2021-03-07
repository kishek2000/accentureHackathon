import { coursesLessonData } from "../store/lessonData";

export function getCourseLessonData(courseName, lessonId) {
  const courseData = coursesLessonData.filter(
    (course) => course.courseId === courseName
  )[0].lessons;
  const lessonData = courseData.filter(
    (storedLesson) => storedLesson.lessonId === lessonId
  )[0];

  return lessonData;
}
