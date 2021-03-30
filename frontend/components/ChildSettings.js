/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { GapHorizontal } from "./GapHorizontal";
import { InputBox } from "./InputBox";
import { AvatarSelection } from "./AvatarSelection";
import { LearningStyleDropdown } from "./LearningStyleDropdown";
import { RegisterButton } from "./RegisterButton";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ContentContext } from "../context/ContentContext";
import { registerUserChild } from "../api/AuthenticateUser";
import { AvatarOverlay } from "./AvatarOverlay";

export function ChildSettings() {
  const [registerChild, setRegisterChild] = useState(false);
  const [currAvatar, setCurrAvatar] = useState();

  useEffect(() => {
    setCurrAvatar(JSON.parse(localStorage.getItem("currChild"))["avatar"]);
  });

  return (
    <>
      <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
        Child Settings
      </div>
      <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
        Update your children’s account details, and or add/remove a child from
        your account.
      </div>
      <GapVertical times={6} />
      {/* <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          background: "white",
          padding: "36px 64px",
          borderRadius: 16,
          width: "100%",
          height: "30%",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <img
            src={`/avatars/${currAvatar}.png`}
            css={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
          <GapVertical times={4} />
          <div
            css={{
              fontFamily: "Poppins",
              fontSize: 16,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Edit Avatar
          </div>
        </div>
      </div> */}
      <div
        css={{
          width: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Poppins",
          fontSize: "16px",
          padding: "8px 16px",
          background: "white",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.05)",
          borderRadius: 16,
          // height: "20%",
          cursor: "pointer",
          transition: "0.7s",
          "&:hover": {
            background: "#0500FF",
            color: "white",
          },
        }}
        onClick={() => {
          setRegisterChild(true);
        }}
      >
        + Add New Child
      </div>
      {registerChild && (
        <AddChildModal
          setRegisterChild={setRegisterChild}
          registerChild={registerChild}
        />
      )}
    </>
  );
}

export function AddChildModal({ setRegisterChild }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarOverlay, setAvatarOverlay] = useState(false);
  const [dob, setDob] = useState("");
  const [LS, setLS] = useState("");
  const { user, userDispatch } = useContext(UserContext);
  const { contentDispatch } = useContext(ContentContext);

  // const userId = user.user.userId ? user.user.userId : user.user["user_id"];
  // console.log(user.user);

  const handleRegisterChild = useCallback(async () => {
    const userId = JSON.parse(localStorage.getItem("user"))["user_id"];

    const registerChildResponse = await registerUserChild(
      userId,
      name,
      avatar,
      dob,
      LS
    );

    userDispatch({
      type: "authenticated-child",
      payload: registerChildResponse["updated_parent"][0].children[0],
    });

    const currUser = JSON.parse(localStorage.getItem("user"));
    const totalChildren =
      registerChildResponse["updated_parent"][0].children.length;

    currUser["children"].push(
      registerChildResponse["updated_parent"][0].children[totalChildren - 1]
    );

    localStorage.setItem("user", JSON.stringify(currUser));
    setRegisterChild(false);
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

  return (
    <div
      css={{
        position: "absolute",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndez: 20,
      }}
    >
      <div
        css={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          width: "35%",
          height: "50%",
          borderRadius: 16,
        }}
      >
        <div css={{ fontSize: "32px", fontFamily: "Poppins", fontWeight: 600 }}>
          Add New Child
        </div>
        <GapVertical times={6} />
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
        <AddChildButton handleRegister={handleRegisterChild} />
        {avatarOverlay ? (
          <AvatarOverlay
            setAvatarOverlay={setAvatarOverlay}
            callback={handleAvatarCallback}
            selection={avatar}
          />
        ) : null}
        <div
          css={{
            display: avatarOverlay ? "none" : "",
            position: "absolute",
            fontFamily: "Poppins",
            fontSize: "16px",
            top: "30px",
            right: "30px",
            cursor: "pointer",
          }}
          onClick={() => setRegisterChild(false)}
        >
          X
        </div>
      </div>
    </div>
  );
}

export function AddChildButton({ handleRegister }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: 480,
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "flex-end",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0500FF",
          width: 126,
          height: 34,
          borderRadius: 16,
          fontFamily: "Poppins",
          color: "white",
          fontWeight: 600,
          cursor: "pointer",
        }}
        onClick={async () => await handleRegister()}
      >
        {"ADD"}
      </div>
    </div>
  );
}
