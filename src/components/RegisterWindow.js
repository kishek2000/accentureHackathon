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
    <div css={{ display: "flex", flexDirection: "column", maxWidth: 1024 }}>
      <div
        css={{
          fontFamily: "Poppins",
          fontWeight: 900,
          fontSize: 64,
          alignSelf: "center",
        }}
      >
        Register
      </div>
      <GapVertical times={4} />
      <InputBox placeholder="Username" callback={handleUsernameCallback} />
      <GapVertical times={3} />
      <InputBox placeholder="Email" callback={handleEmailCallback} />
      <GapVertical times={3} />
      <InputBox
        placeholder="Create Password"
        callback={handleCreatePasswordCallback}
      />
      <GapVertical times={3} />
      <InputBox
        placeholder="Confirm Password"
        callback={handleConfirmPasswordCallback}
      />
      <GapVertical times={6} />
      <RegisterButton route={"/register-child"} />
    </div>
  );
}
