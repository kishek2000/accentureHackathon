/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { AvatarImage } from "./AvatarImage";
import { GapVertical } from "./GapVertical";
import { useRouter } from "next/router";
import { GapHorizontal } from "./GapHorizontal";

export function HeaderProfile({ callback, route }) {
  const [childName, setChildName] = useState("");
  const [sessionDropdown, setSessionDropdown] = useState(false);
  const [switchChildModal, setSwitchChildModal] = useState(false);

  useEffect(() => {
    setChildName(JSON.parse(localStorage.getItem("currChild"))["name"]);
  });

  return (
    <>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "28px",
          right: "40px",
          background: "white",
          borderRadius: 16,
          padding: 8,
          boxShadow: "0px 0px 48px rgba(0,0,0,0.1)",
          cursor: "pointer",
          zIndex: 2,
        }}
        onClick={() => setSessionDropdown(!sessionDropdown)}
      >
        <AvatarImage size="small" />
        <GapVertical times={1} />
        <div
          css={{
            fontFamily: "Poppins",
            fontSize: 12,
            fontWeight: 600,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {childName}
        </div>
        {sessionDropdown && (
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "absolute",
              width: 160,
              height: 80,
              right: 0,
              bottom: -92,
              background: "white",
              borderRadius: 16,
              boxShadow: "0px 0px 48px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src={"/dropdown.png"}
              css={{
                width: 16,
                height: 16,
                position: "absolute",
                top: -8,
                right: 24,
              }}
            />
            <ProfileDropdownOptions
              title="Switch Child"
              callback={setSwitchChildModal}
            />
            <div
              css={{
                height: "1px",
                background: "rgba(0,0,0,0.1)",
                width: "80%",
                margin: "8px 0px",
                alignSelf: "center",
              }}
            />
            <ProfileDropdownOptions
              title="Settings"
              callback={callback}
              route={route}
              settings={true}
            />
          </div>
        )}
      </div>
      {switchChildModal && (
        <SwitchChildModal setSwitchChildModal={setSwitchChildModal} />
      )}
    </>
  );
}

export function SwitchChildModal({ setSwitchChildModal }) {
  const [children, setChildren] = useState([]);
  const [childName, setChildName] = useState("");

  useEffect(() => {
    setChildren(JSON.parse(localStorage.getItem("user"))["children"]);
    setChildName(JSON.parse(localStorage.getItem("currChild"))["name"]);
  });

  const updateCurrChild = useCallback((child) => {
    localStorage.setItem("currChild", JSON.stringify(child));
    location.reload();
  });

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        background: "rgba(0,0,0,0.7)",
        top: 0,
        right: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 5,
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          width: "35%",
          height: "25%",
          position: "relative",
          borderRadius: 16,
        }}
      >
        <GapVertical times={6} />
        <div css={{ fontFamily: "Poppins", fontWeight: 600, fontSize: 24 }}>
          Switch Child
        </div>
        <GapVertical times={3} />
        <div
          css={{ position: "absolute", top: 24, right: 24, cursor: "pointer" }}
          onClick={() => setSwitchChildModal(false)}
        >
          X
        </div>
        <div
          css={{
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            gridTemplateColumns:
              window.innerWidth < 1920 ? "repeat(4, 22.5%)" : "repeat(5, 15%)",
            gridGap: 12,
            width: "100%",
          }}
        >
          {children &&
            children.map((child) => (
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "0.7s",
                  padding: "12px 8px",
                  borderRadius: 16,
                  background:
                    child["name"] === childName ? "rgba(0,0,0,0.05)" : "",
                  "&:hover": {
                    background:
                      child["name"] !== childName ? "rgba(0,0,0,0.03)" : "",
                  },
                  cursor: "pointer",
                }}
                onClick={() => updateCurrChild(child)}
              >
                <img
                  src={`/avatars/${child["avatar"]}.png`}
                  css={{ width: 96, height: 96 }}
                />
                <GapVertical times={1} />
                <div
                  css={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 500 }}
                >
                  {child["name"]}
                </div>
              </div>
            ))}
        </div>
        <GapVertical times={6} />
      </div>
    </div>
  );
}

export function ProfileDropdownOptions({ title, callback, settings, route }) {
  const [goToSettings, setGoToSettings] = useState(false);
  const router = useRouter();

  const handleSettingsCallback = useCallback(() => {
    setGoToSettings(true);
  });

  if (goToSettings) {
    console.log("going to settings");
    localStorage.setItem("dashboardScreen", "settings");
    router.push(`/dashboard`);
  }

  return (
    <div
      css={{
        fontFamily: "Poppins",
        fontSize: 14,
        marginLeft: 20,
        "&:hover": { fontWeight: 500 },
      }}
      onClick={(e) => {
        console.log(e.target);
        if (settings) {
          if (route) {
            handleSettingsCallback();
          } else {
            callback("settings");
          }
        } else {
          callback(true);
        }
      }}
    >
      {title}
    </div>
  );
}
