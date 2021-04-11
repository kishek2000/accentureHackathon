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
import { RegistrationHeader } from "./RegistrationHeader";
import { LearningStyleDropdown } from "./LearningStyleDropdown";
import { AvatarSelection } from "./AvatarSelection";

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
