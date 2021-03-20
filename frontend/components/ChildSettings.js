/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { GapHorizontal } from "./GapHorizontal";

export function ChildSettings() {
  return (
    <>
      <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
        Child Settings
      </div>
      <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
        Update your children’s account details, and or add/remove a child from
        your account.
      </div>
      <GapVertical times={6} />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          background: "white",
          padding: "36px 64px",
          borderRadius: 16,
          width: "100%",
          height: "30%",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            css={{
              width: 160,
              height: 160,
              background: "#888888",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
          <GapVertical times={4} />
          <div
            css={{
              fontFamily: "Poppins",
              fontSize: 16,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Edit Avatar
          </div>
        </div>
      </div>
    </>
  );
}
