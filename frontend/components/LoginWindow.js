/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { useCallback, useContext, useEffect, useState } from "react";
import { GapHorizontal } from "./GapHorizontal";
import { GapVertical } from "./GapVertical";
import { LoginButton } from "./LoginButton";
import { InputBox } from "./InputBox";
import { useRouter } from "next/router";

import { UserContext } from "../context/UserContext";
import { loginUser } from "../api/AuthenticateUser";
import { getCourses } from "../api/Content";
import { ContentContext } from "../context/ContentContext";

export function LoginWindow() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const { user, userDispatch } = useContext(UserContext);
  const { content, contentDispatch } = useContext(ContentContext);

  const handleLogin = useCallback(async () => {
    const loginResponse = await loginUser(username, password);
    if (loginResponse.token) {
      const allCourseData = await getCourses();
      contentDispatch({
        type: "populateCourses",
        payload: allCourseData,
      });
      userDispatch({
        type: "authenticated",
        payload: loginResponse,
      });
    } else {
      alert("Invalid username or password");
    }
  }, [username, password]);

  const handleUsernameCallback = useCallback(
    (text) => {
      setUsername(text);
    },
    [username]
  );

  const handlePasswordCallback = useCallback(
    (text) => {
      setPassword(text);
    },
    [password]
  );

  const handleNewUser = useCallback(() => {
    setNewUser(true);
  }, [newUser]);

  useEffect(() => {
    console.log("content changed", content);
    localStorage.setItem("content", JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    if (user.user && user.user.token) {
      setLogin(true);
    }
  }, [user]);

  if (newUser) {
    const router = useRouter();
    router.push("/register");
  }

  if (login) {
    const router = useRouter();
    router.push("/dashboard");
  }

  return (
    <div css={{ display: "flex", flexDirection: "row" }}>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={"/logo.png"}
          style={{ width: 96, height: 96, objectFit: "contain" }}
        />
        <div
          css={{
            fontFamily: "Poppins",
            fontWeight: 800,
            fontSize: 72,
          }}
        >
          GalaticEd
        </div>
        <div
          css={{
            fontFamily: "Poppins",
            fontWeight: 200,
            fontSize: 24,
            marginTop: -12,
          }}
        >
          Learning tailored to you.
        </div>
      </div>
      <GapHorizontal times={60} />
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          padding: "72px 48px",
          background: "white",
          borderRadius: 16,
        }}
      >
        <div
          css={{
            fontFamily: "Poppins",
            fontWeight: 800,
            fontSize: 30,
            alignSelf: "center",
          }}
        >
          Login
        </div>
        <GapVertical times={6} />
        <GoogleSignInButton />
        <GapVertical times={4} />
        <div
          css={{
            fontFamily: "Poppins",
            fontWeight: 300,
            fontSize: 24,
            alignSelf: "center",
          }}
        >
          OR
        </div>
        <GapVertical times={4} />
        <InputBox placeholder="Username" callback={handleUsernameCallback} />
        <GapVertical times={4} />
        <InputBox
          placeholder="Password"
          callback={handlePasswordCallback}
          type={"password"}
        />
        <GapVertical times={6} />
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            css={{
              textDecorationLine: "underline",
              fontFamily: "Poppins",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Forgot Password
          </div>
          <LoginButton handleLogin={handleLogin} />
        </div>
      </div>
      <div
        css={{
          fontFamily: "Poppins",
          fontSize: 16,
          position: "absolute",
          top: 56,
          right: 56,
        }}
      >
        New around here?{" "}
        <strong
          css={{ textDecorationLine: "underline", cursor: "pointer" }}
          onClick={handleNewUser}
        >
          Register.
        </strong>
      </div>
    </div>
  );
}

export function GoogleSignInButton() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background: "white",
        width: "100%",
        padding: "12px 120px",
        boxShadow: "0px 0px 27px rgba(0, 0, 0, 0.06)",
        borderRadius: 16,
        cursor: "pointer",
      }}
    >
      <img src={"/google.png"} css={{ width: 24, height: 24 }} />
      <GapHorizontal times={3} />
      <div css={{ fontSize: 18, fontFamily: "Poppins", color: "#555555" }}>
        Sign in with Google
      </div>
    </div>
  );
}
