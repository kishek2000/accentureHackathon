/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

export function InputBox({ placeholder, callback }) {
  return (
    <input
      css={{
        backgroundColor: "#EEEEEE",
        height: 48,
        width: 480,
        borderRadius: 36,
        outline: "none",
        border: "none",
        paddingLeft: 24,
        fontFamily: "Poppins",
        fontSize: 16,
      }}
      placeholder={placeholder}
      onChange={(e) => callback(e.target.value)}
    />
  );
}
