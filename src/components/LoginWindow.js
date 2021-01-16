/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { useCallback, useState } from "react";
import { GapVertical } from "./GapVertical";
import { LoginButton } from "./LoginButton";
import { LoginInput } from "./LoginInput";

export function LoginWindow() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        GalaticEd
      </div>
      <GapVertical times={4} />
      <LoginInput placeholder="Username" callback={handleUsernameCallback} />
      <GapVertical times={3} />
      <LoginInput placeholder="Password" callback={handlePasswordCallback} />
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
          }}
        >
          Forgot Password
        </div>
        <LoginButton />
      </div>
      <GapVertical times={24} />
      <div css={{ fontFamily: "Poppins", fontSize: 21, alignSelf: "center" }}>
        New around here?{" "}
        <strong css={{ textDecorationLine: "underline" }}>Register</strong>
      </div>
    </div>
  );
}
