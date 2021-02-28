/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { ChildSettings } from "./ChildSettings";
import { AccountSettings } from "./AccountSettings";

export function SettingsScreen() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        paddingLeft: 240,
        width: "85%",
      }}
    >
      <GapVertical times={20} />
      <AccountSettings />
      <GapVertical times={15} />
      <ChildSettings />
    </div>
  );
}
