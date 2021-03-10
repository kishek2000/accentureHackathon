const baseURL = "https://galacticed.xyz/api";
// "http://ec2-3-138-143-55.us-east-2.compute.amazonaws.com:8888/api";

export async function getCourses() {
  const coursesAndLessons = await fetch(`${baseURL}/courses/all`);
  return await coursesAndLessons.json();
}

export async function getAllCourseLessonData() {
  const lessonDataResponse = await fetch(`${baseURL}/courses/full`);
  const coursesLessonData = await lessonDataResponse.json();

  return coursesLessonData;
}

export function getCourseLessonData(courseName, lessonId, arr) {
  if (arr) {
    const courseData = arr.filter((course) => course.courseId === courseName)[0]
      .lessons;

    const lessonData = courseData.filter(
      (storedLesson) => storedLesson.lessonId === lessonId
    )[0];

    return lessonData;
  }
  return null;
}
