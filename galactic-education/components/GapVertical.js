/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

export function GapVertical({ times }) {
  return <div css={{ marginBottom: `${4 * times}px` }} />;
}
