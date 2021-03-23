/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { GapVertical } from "./GapVertical";
import { AvatarImage, Avatars } from "./AvatarImage";

export function AvatarOverlay({ setAvatarOverlay, callback, selection }) {
  return (
    <div
      css={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
      }}
    >
      <div
        css={{
          background: "white",
          width: "42.5%",
          height: "60%",
          borderRadius: 16,
          padding: "64px 48px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          css={{ position: "absolute", top: 24, right: 24, cursor: "pointer" }}
          onClick={() => setAvatarOverlay(false)}
        >
          X
        </div>
        <p
          css={{
            fontFamily: "Poppins",
            fontSize: 16,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Select an avatar from the animals below!
        </p>
        <GapVertical times={10} />
        <div
          css={{
            display: "grid",
            gridTemplateColumns:
              window.innerWidth < 1920 ? "repeat(4, 22.5%)" : "repeat(5, 15%)",
            gridGap: 12,
            alignItems: "center",
            justifyContent: "center",
            height: "85%",
            overflowY: "scroll",
          }}
        >
          {Avatars.map((avatar) => (
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 8px 0px 8px",
                "&:hover": {
                  background: "rgba(0,0,0,0.05)",
                },
                background: selection === avatar ? "rgba(0,0,0,0.05)" : null,
                borderRadius: 16,
                cursor: "pointer",
                transition: "0.6s",
              }}
              onClick={() => callback(avatar)}
            >
              {console.log(avatar)}
              <AvatarImage avatar={avatar} size={"large"} />
              <p
                css={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                }}
              >
                {FixAnimalTitle(avatar)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FixAnimalTitle(animal) {
  const noDashes = String(animal).replace("-", "");
  const capitalised = noDashes[0].toUpperCase() + noDashes.slice(1);
  return capitalised;
}
