/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { InputBox } from "./InputBox";

export function RegisterChildInputWithHelp({ placeholder, callback, type }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
      }}
    >
      <InputBox placeholder={placeholder} callback={callback} type={type} />
      <img
        src={"/help.png"}
        css={{ width: 16, height: 16, position: "absolute", right: -24 }}
      />
    </div>
  );
}
