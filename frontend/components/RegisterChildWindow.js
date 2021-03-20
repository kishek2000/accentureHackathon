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
import { AvatarOverlay } from "./AvatarOverlay";

export function RegisterChildWindow() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarOverlay, setAvatarOverlay] = useState(false);
  const [dob, setDob] = useState("");
  const [LS, setLS] = useState("");
  const [registerChild, setRegisterChild] = useState(false);

  const { user, userDispatch } = useContext(UserContext);
  const { content, contentDispatch } = useContext(ContentContext);

  const handleRegisterChild = useCallback(async () => {
    const registerChildResponse = await registerUserChild(
      user.user.userId,
      name,
      avatar,
      dob,
      LS
    );
    const allCourseData = await getCourses();
    contentDispatch({
      type: "populateCourses",
      payload: allCourseData,
    });
    userDispatch({
      type: "authenticated-child",
      payload: registerChildResponse["updated_parent"][0].children[0],
    });
    const currUser = JSON.parse(localStorage.getItem("user"));
    console.log(currUser, currUser["children"]);
    const totalChildren =
      registerChildResponse["updated_parent"][0].children.length;
    currUser["children"].push(
      registerChildResponse["updated_parent"][0].children[totalChildren - 1]
    );
    localStorage.setItem(
      "currChild",
      JSON.stringify(
        registerChildResponse["updated_parent"][0].children[totalChildren - 1]
      )
    );
    localStorage.setItem("user", JSON.stringify(currUser));
  }, [name, dob, LS]);

  const handleNameCallback = useCallback(
    (text) => {
      setName(text);
    },
    [name]
  );

  const handleAvatarOverlayCallback = useCallback(() => {
    setAvatarOverlay(true);
  }, [avatarOverlay]);

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

  const handleLSCallback = useCallback(
    (text) => {
      setLS(text);
    },
    [LS]
  );

  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(content));
  }, [content]);

  useEffect(() => {
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
        position: "relative",
      }}
    >
      <RegistrationHeader />
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
        <AvatarSelection
          avatar={avatar}
          handleAvatarOverlayCallback={handleAvatarOverlayCallback}
        />
        <GapVertical times={3} />
        <InputBox
          placeholder="Birthdate"
          type={"date"}
          callback={handleDobCallback}
        />
        <GapVertical times={3} />
        <LearningStyleDropdown handleLSCallback={handleLSCallback} LS={LS} />
        <GapVertical times={6} />
        <RegisterButton
          route={"/dashboard"}
          handleRegister={handleRegisterChild}
          register={registerChild}
        />
      </div>
      {avatarOverlay ? (
        <AvatarOverlay
          setAvatarOverlay={setAvatarOverlay}
          callback={handleAvatarCallback}
          selection={avatar}
        />
      ) : null}
    </div>
  );
}

export function AvatarSelection({ avatar, handleAvatarOverlayCallback }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        height: 48,
        width: 480,
        borderRadius: 16,
        paddingLeft: 24,
        fontFamily: "Poppins",
        fontSize: 18,
        fontWeight: 300,
        color: !avatar ? "rgba(0,0,0,0.6)" : "black",
        cursor: "pointer",
      }}
      onClick={handleAvatarOverlayCallback}
    >
      {avatar ? avatar[0].toUpperCase() + avatar.slice(1) : "Select Avatar"}
    </div>
  );
}

export function LearningStyleDropdown({ handleLSCallback, LS }) {
  return (
    <div
      css={{
        width: 480,
        height: 48,
        backgroundColor: "#F9F9F9",
        borderRadius: 16,
        paddingLeft: 20,
        cursor: "pointer",
      }}
    >
      <select
        placeholder="Learning Style"
        css={{
          fontFamily: "Poppins",
          fontSize: 18,
          backgroundColor: "#F9F9F9",
          height: 48,
          width: 440,
          borderRadius: 16,
          outline: "none",
          border: "none",
          fontWeight: 300,
          color: !LS ? "rgba(0,0,0,0.6)" : "black",
          cursor: "pointer",
        }}
        onChange={(e) => handleLSCallback(e.target.value)}
      >
        {[
          { id: "Select Learning Style...", hidden: true },
          { id: "Audio", hidden: false },
          { id: "Visual", hidden: false },
          { id: "Audio & Visual", hidden: false },
        ].map((style) => (
          <option
            value={style.id.toLowerCase().replace(/ /g, "").replace("&", "-")}
            hidden={style.hidden}
            key={style.id}
          >
            {style.id}
          </option>
        ))}
      </select>
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

export function RegistrationHeader() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 48,
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
  );
}
