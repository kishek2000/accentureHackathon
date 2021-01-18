/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

export function GapHorizontal({ times }) {
  return <div css={{ marginRight: `${4 * times}px` }} />;
}
