const baseURL = "http://galacticed.xyz/api";
// "http://ec2-3-138-143-55.us-east-2.compute.amazonaws.com:8888/api";

export async function getUserProfile(parentUID, token) {
  const response = await fetch(
    `${baseURL}/profile?` +
      new URLSearchParams({ user_id: parentUID, token: token })
  );
  return await response.json();
}
