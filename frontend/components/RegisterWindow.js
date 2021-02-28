/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { useCallback, useState } from "react";
import { GapVertical } from "../components/GapVertical";
import { InputBox } from "../components/InputBox";
import { RegisterButton } from "../components/RegisterButton";

export function RegisterWindow() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameCallback = useCallback(
    (text) => {
      setUsername(text);
    },
    [username]
  );

  const handleEmailCallback = useCallback(
    (text) => {
      setEmail(text);
    },
    [email]
  );

  const handleCreatePasswordCallback = useCallback(
    (text) => {
      setPassword(text);
    },
    [password]
  );

  const handleConfirmPasswordCallback = useCallback(
    (text) => {
      setConfirmPassword(text);
    },
    [confirmPassword]
  );

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
          Register
        </div>
        <GapVertical times={4} />
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <InputBox
            placeholder="First Name"
            callback={handleUsernameCallback}
            percentage={"49%"}
          />
          <InputBox
            placeholder="Last Name"
            callback={handleUsernameCallback}
            percentage={"49%"}
          />
        </div>
        <GapVertical times={3} />
        <InputBox placeholder="Email" callback={handleEmailCallback} />
        <GapVertical times={3} />
        <InputBox
          placeholder="Password"
          callback={handleCreatePasswordCallback}
        />
        <GapVertical times={3} />
        <InputBox
          placeholder="Confirm Password"
          callback={handleConfirmPasswordCallback}
        />
        <GapVertical times={3} />
        <InputBox
          placeholder="No. of Children"
          callback={handleConfirmPasswordCallback}
        />
        <GapVertical times={6} />
        <RegisterButton route={"/register-child"} />
      </div>
    </div>
  );
}
