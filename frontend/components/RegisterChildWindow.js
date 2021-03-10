/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";

import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { registerUserChild } from "../api/AuthenticateUser";
import { GapVertical } from "./GapVertical";
import { InputBox } from "./InputBox";
import { RegisterButton } from "./RegisterButton";
import { ContentContext } from "../context/ContentContext";
import { getCourses } from "../api/Content";

export function RegisterChildWindow() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [dob, setDob] = useState("");
  const [attSpan, setAttSpan] = useState("");
  const [LS, setLS] = useState("");
  const [FO, setFO] = useState("");

  const [registerChild, setRegisterChild] = useState(false);

  const { user, userDispatch } = useContext(UserContext);
  const { content, contentDispatch } = useContext(ContentContext);

  const handleRegisterChild = useCallback(async () => {
    const registerChildResponse = await registerUserChild(
      user.user.userId,
      name,
      avatar,
      dob,
      attSpan,
      LS,
      FO
    );
    const allCourseData = await getCourses();
    contentDispatch({
      type: "populateCourses",
      payload: allCourseData,
    });
    userDispatch({
      type: "authenticated-child",
      payload: registerChildResponse["updated_parent"].children[0],
    });
  }, [name, dob, attSpan, LS, FO]);

  const handleNameCallback = useCallback(
    (text) => {
      setName(text);
    },
    [name]
  );

  const handleAvatarCallback = useCallback(
    (text) => {
      setAvatar(text);
    },
    [avatar]
  );

  const handleDobCallback = useCallback(
    (text) => {
      setDob(text);
    },
    [dob]
  );

  const handleAttSpanCallback = useCallback(
    (text) => {
      setAttSpan(text);
    },
    [attSpan]
  );

  const handleLSCallback = useCallback(
    (text) => {
      setLS(text);
    },
    [LS]
  );

  const handleFOCallback = useCallback(
    (text) => {
      setFO(text);
    },
    [FO]
  );

  useEffect(() => {
    localStorage.setItem("content", content);
  }, [content]);

  useEffect(() => {
    // console.log(user);
    if (user.user?.children?.length > 0) {
      setRegisterChild(true);
    }
  }, [user]);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 36,
          left: "50%",
          transform: "translate(-50%, 0%)",
        }}
      >
        <img
          src={"/logo.png"}
          style={{ width: 48, height: 48, objectFit: "contain" }}
        />
        <div
          css={{
            fontFamily: "Poppins",
            fontWeight: 800,
            fontSize: 48,
          }}
        >
          GalaticEd
        </div>
        <div
          css={{
            fontFamily: "Poppins",
            fontWeight: 200,
            fontSize: 16,
            marginTop: -12,
          }}
        >
          Learning tailored to you.
        </div>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "white",
          padding: "72px 48px",
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
          Register Child
        </div>
        <GapVertical times={4} />

        <InputBox placeholder="First Name" callback={handleNameCallback} />
        <GapVertical times={3} />
        <InputBox placeholder="Avatar" callback={handleAvatarCallback} />
        <GapVertical times={3} />
        <InputBox
          placeholder="Birthdate"
          type={"date"}
          callback={handleDobCallback}
        />
        <GapVertical times={3} />
        <RegisterChildInputWithHelp
          placeholder={"Attention Span"}
          callback={handleAttSpanCallback}
        />
        <GapVertical times={3} />
        <RegisterChildInputWithHelp
          placeholder={"Learning Style"}
          callback={handleLSCallback}
        />
        <GapVertical times={3} />
        <RegisterChildInputWithHelp
          placeholder={"Favourite Object"}
          callback={handleFOCallback}
        />
        <GapVertical times={6} />
        <RegisterButton
          route={"/dashboard"}
          handleRegister={handleRegisterChild}
          register={registerChild}
        />
      </div>
    </div>
  );
}

export function RegisterChildInputWithHelp({ placeholder, callback, type }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
      }}
    >
      <InputBox placeholder={placeholder} callback={callback} type={type} />
      <img
        src={"/help.png"}
        css={{ width: 16, height: 16, position: "absolute", right: -24 }}
      />
    </div>
  );
}
