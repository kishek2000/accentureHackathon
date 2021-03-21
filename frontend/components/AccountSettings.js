/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "./GapHorizontal";
import { GapVertical } from "./GapVertical";

export function AccountSettings() {
  return (
    <>
      <div css={{ fontFamily: "Poppins", fontSize: 20, fontWeight: 600 }}>
        Account Settings
      </div>
      <div css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 400 }}>
        Update your account settings
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
          // height: "30%",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* <div css={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <div css={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 20 }}>
            THEME
          </div>
          <GapVertical times={3} />
          <div
            css={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                css={{
                  width: 96,
                  height: 96,
                  background: "#888888",
                  borderRadius: 16,
                }}
              />
              <GapVertical times={2} />
              <div
                css={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 16 }}
              >
                Dark Mode
              </div>
            </div>
          </div>
        </div>
        <div css={{ display: "flex", flexDirection: "column", width: "70%" }}>
          <div css={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 20 }}>
            USER
          </div>
          <GapVertical times={3} />
          <MutableAccountSetting field={"Username"} value={"kishek2000"} />
          <GapVertical times={2} />
          <MutableAccountSetting field={"Email"} value={"kishek12@gmail.com"} />
          <GapVertical times={2} />
          <MutableAccountSetting field={"Password"} value={"*******"} />
        </div> */}
      </div>
    </>
  );
}

export function MutableAccountSetting({ field, value }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "35%",
        justifyContent: "space-between",
      }}
    >
      <div
        css={{
          fontFamily: "Poppins",
          fontSize: 16,
          display: "flex",
          flexDirection: "row",
        }}
      >
        {field}:
        <GapHorizontal times={2} />
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: "16",
            marginTop: field === "Password" ? 7 : null,
            lineHeight: field === "Password" ? 1 : null,
            fontWeight: 600,
          }}
        >
          {value}
        </div>
      </div>
      <GapHorizontal times={8} />
      <div
        css={{
          fontFamily: "Poppins",
          fontSize: 12,
          cursor: "pointer",
          background: "#EEEEEE",
          padding: 8,
          borderRadius: 12,
          "&:hover": {
            background: "#DDDDDD",
          },
          transition: "0.5s",
        }}
      >
        Edit
      </div>
    </div>
  );
}
