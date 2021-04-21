/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { GapHorizontal } from "./GapHorizontal";
import { useState } from "react";
import { GapVertical } from "./GapVertical";
import * as themes from "../store/themes";

export function ThemeSettings() {
  var [numUpdated, forceUpdate] = useState(0);
  var curTheme = localStorage.getItem("theme");
  if (curTheme == null) {
    curTheme = "none";
  }
  return (
    <div>
      <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
        Theme Settings
      </div>
      <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
        Pick a theme your child has interest in.
      </div>
      <GapVertical times={6} />
      <form
        onChange={(e) => {
          if (e.target.value != null) {
            localStorage.setItem("theme", e.target.value);
            forceUpdate(numUpdated + 1);
          } else {
            localStorage.removeItem("theme");
            forceUpdate(numUpdated + 1);
          }
        }}
      >
        <div
          css={{
            width: "192px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.05)",
            borderRadius: 12,
          }}
        >
          <select
            defaultValue={curTheme}
            css={{
              border: "none",
              outline: "none",
              width: "164px",
              fontFamily: "Poppins",
              fontSize: "16px",
              height: "40px",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {Object.keys(themes)
              .sort()
              .map((theme) => (
                <option value={theme}>
                  {theme[0].toUpperCase() + theme.slice(1)}
                </option>
              ))}
          </select>
        </div>
      </form>
      <div>
        {curTheme != "none" &&
          themes[curTheme].map((picLink) => (
            <img
              src={"/themes/" + curTheme + "/" + picLink}
              css={{
                width: "100px",
                height: "100px",
              }}
            />
          ))}
      </div>
    </div>
  );
}
