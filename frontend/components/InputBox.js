/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";

export function InputBox({ placeholder, callback, percentage, type }) {
  const [inputType, setInputType] = useState("");
  return (
    <input
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        height: 48,
        width: percentage ? percentage : 480,
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
        console.log(e.target.value);
        callback(e.target.value);
      }}
    />
  );
}
