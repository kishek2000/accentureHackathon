/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
export function LearningStyleDropdown({ handleLSCallback, LS }) {
  return (
    <div
      css={{
        width: 480,
        height: 48,
        backgroundColor: "#F9F9F9",
        borderRadius: 16,
        paddingLeft: 20,
        cursor: "pointer",
      }}
    >
      <select
        placeholder="Learning Style"
        css={{
          fontFamily: "Poppins",
          fontSize: 18,
          backgroundColor: "#F9F9F9",
          height: 48,
          width: 440,
          borderRadius: 16,
          outline: "none",
          border: "none",
          fontWeight: 300,
          color: !LS ? "rgba(0,0,0,0.6)" : "black",
          cursor: "pointer",
        }}
        onChange={(e) => handleLSCallback(e.target.value)}
      >
        {[
          { id: "Select Learning Style...", hidden: true },
          { id: "Audio", hidden: false },
          { id: "Visual", hidden: false },
          { id: "Audio & Visual", hidden: false },
        ].map((style) => (
          <option
            value={style.id.toLowerCase().replace(/ /g, "").replace("&", "-")}
            hidden={style.hidden}
            key={style.id}
          >
            {style.id}
          </option>
        ))}
      </select>
    </div>
  );
}
