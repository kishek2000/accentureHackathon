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
          Register Child 1
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
          <InputBox placeholder="First Name" percentage={"49%"} />
          <InputBox placeholder="Last Name" percentage={"49%"} />
        </div>
        <GapVertical times={3} />
        <InputBox placeholder="Age" />
        <GapVertical times={3} />
        <RegisterChildInputWithHelp placeholder={"Attention Span"} />
        <GapVertical times={3} />
        <RegisterChildInputWithHelp placeholder={"Learning Style"} />
        <GapVertical times={3} />
        <RegisterChildInputWithHelp placeholder={"Favourite Object"} />
        <GapVertical times={6} />
        <RegisterButton route={"/dashboard"} />
      </div>
    </div>
  );
}

export function RegisterChildInputWithHelp({ placeholder }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
      }}
    >
      <InputBox placeholder={placeholder} />
      <img
        src={"/help.png"}
        css={{ width: 16, height: 16, position: "absolute", right: -24 }}
      />
    </div>
  );
}
