/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";

export function InputBox({ placeholder, callback, type }) {
  const [inputType, setInputType] = useState("");
  return (
    <div
      css={{
        width: 480,
        height: 48,
        borderRadius: 16,
        backgroundColor: "#F9F9F9",
      }}
    >
      <input
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F9F9F9",
          height: 48,
          width: 466,
          borderRadius: 16,
          outline: "none",
          border: "none",
          paddingLeft: 24,
          fontFamily: "Poppins",
          fontSize: 18,
          fontWeight: 300,
        }}
        type={type === "password" ? type : inputType ? inputType : null}
        onFocus={() => {
          setInputType(type);
        }}
        onBlur={() => {
          setInputType("");
        }}
        placeholder={placeholder}
        onChange={(e) => {
          callback(e.target.value);
        }}
      />
    </div>
  );
}
