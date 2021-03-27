const baseURL = "https://galacticed.xyz/api";
// "http://ec2-3-138-143-55.us-east-2.compute.amazonaws.com:8888/api";

export async function getUserProfile(parentUID) {
  const response = await fetch(
    `${baseURL}/profile?` + new URLSearchParams({ user_id: parentUID })
  );
  return await response.json();
}

export async function postLessonStats(
  user_id,
  child_id,
  course_id,
  lesson_id,
  date,
  num_incorrect,
  time_taken
) {
  const postStatsData = new FormData();
  postStatsData.append("user_id", user_id);
  postStatsData.append("child_id", child_id);
  postStatsData.append("course_id", course_id);
  postStatsData.append("lesson_id", lesson_id);
  postStatsData.append("date", date);
  postStatsData.append("num_incorrect", num_incorrect);
  postStatsData.append("time_taken", time_taken);

  console.log({
    user_id,
    child_id,
    course_id,
    lesson_id,
    date,
    num_incorrect,
    time_taken,
  });

  const response = await fetch(`${baseURL}/profile/stats`, {
    method: "POST",
    body: postStatsData,
  });
  const data = await response.json();
  return data;
}

// export async function getLessonStats(user_id) {

// }
