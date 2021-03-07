const baseURL = "https://galacticed.xyz/api";
// "http://ec2-3-138-143-55.us-east-2.compute.amazonaws.com:8888/api";

export async function registerUserChild(
  parentUID,
  name,
  avatar,
  birthday,
  attSpan,
  learningStyle,
  favObject
) {
  const registerData = new FormData();
  registerData.append("user_id", parentUID);
  registerData.append("name", name);
  registerData.append("avatar", avatar);
  registerData.append("birthday", birthday);
  registerData.append("attention_span", attSpan);
  registerData.append("learning_style", learningStyle);
  registerData.append("favourite_object", favObject);
  console.log(">> Registering child of user", parentUID, "with credentials", {
    name,
    avatar,
    birthday,
    attSpan,
    learningStyle,
    favObject,
  });

  const response = await fetch(`${baseURL}/auth/registerchild`, {
    method: "POST",
    body: registerData,
  });
  return await response.json();
}

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

  const response = await fetch(`${baseURL}/auth/register`, {
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

  const response = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    body: loginData,
  });
  const success = await response.json();
  return success;
}
