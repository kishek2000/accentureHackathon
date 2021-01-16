/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { useCallback, useState } from "react";
import { GapVertical } from "./GapVertical";
import { InputBox } from "./InputBox";
import { RegisterButton } from "./RegisterButton";

export function RegisterChildWindow() {
  const [firstName, setFirstName] = useState("");
  const [dob, setDob] = useState("");
  const [attSpan, setAttSpan] = useState("");

  const handleFirstNameCallback = useCallback(
    (text) => {
      setFirstName(text);
    },
    [firstName]
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
      <InputBox placeholder="First Name" callback={handleFirstNameCallback} />
      <GapVertical times={3} />
      <InputBox placeholder="Date of Birth" callback={handleDobCallback} />
      <GapVertical times={3} />
      <InputBox
        placeholder="Attention Span (in minutes)"
        callback={handleAttSpanCallback}
      />
      <GapVertical times={6} />
      <RegisterButton route={"/dashboard"} />
    </div>
  );
}
