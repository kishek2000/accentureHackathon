const baseURL = "https://galacticed.xyz/api";

export async function getRecommendedLesson(courseId, userId, childId) {
  const recData = new FormData();
  recData.append("course_id", courseId);
  recData.append("child_id", childId);
  recData.append("user_id", userId);

  const response = await fetch(
    `${baseURL}/recommend/next_lesson?` +
      new URLSearchParams({
        course_id: courseId,
        child_id: childId,
        user_id: userId,
      })
  );
  const data = await response.text();
  return data;
}
