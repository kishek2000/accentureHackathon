export async function registerUser(username, email, password) {
  const requestData = new FormData();
  requestData.append("username", username);
  requestData.append("email", email);
  requestData.append("password", password);

  const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
    method: "POST",
    body: requestData,
  });
  return await response.json();
}
