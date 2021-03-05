export async function registerUser(username, email, password) {
  const registerData = new FormData();
  registerData.append("username", username);
  registerData.append("email", email);
  registerData.append("password", password);
  console.log(">> Registering user with credentials", {
    username,
    email,
    password,
  });

  const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
    method: "POST",
    body: registerData,
  });
  return await response.json();
}

export async function loginUser(email, password) {
  const loginData = new FormData();
  loginData.append("email", email);
  loginData.append("password", password);
  console.log(">> Attempting login for user with credentials", {
    email,
    password,
  });

  const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
    method: "POST",
    body: loginData,
  });
  const success = await response.json();
  console.log(success);
  return success;
}
