/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapVertical } from "./GapVertical";
import { DashboardGalacticEdLogoRow } from "./DashboardGalacticEdLogoRow";
import { MenuItem } from "./MenuItem";
import { menuNavigation } from "../store/nav";
import { GapHorizontal } from "./GapHorizontal";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function MenuPanel({ selectedScreen, setSelectedScreen }) {
  const [logout, setLogout] = useState(false);
  const handleScreenSelection = useCallback((screen) => {
    localStorage.setItem("dashboardScreen", screen);
    setSelectedScreen(screen);
  });

  const { userDispatch } = useContext(UserContext);

  const handleLogout = useCallback(() => {
    userDispatch({
      type: "logout",
    });
    setLogout(true);
  });

  if (logout) {
    const router = useRouter();
    router.push("/");
  }

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        height: "100vh",
        background:
          "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.51) 57.44%, #FEFEFE 100%)",
        width: 240,
        borderRadius: "0px 8px 8px 0px",
      }}
    >
      <GapVertical times={20} />
      <DashboardGalacticEdLogoRow />
      <GapVertical times={35} />
      {menuNavigation.map((menuItem, index) => (
        <>
          <MenuItem
            selectedScreen={selectedScreen}
            handleScreenSelection={handleScreenSelection}
            menuItem={menuItem}
          />
          {index !== 3 && <GapVertical times={2.5} />}
        </>
      ))}
      <div
        css={{
          alignSelf: "end",
          position: "absolute",
          bottom: 60,
          left: 35,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        <img
          src={"/logout.png"}
          css={{ height: 36, width: 36, objectFit: "contain" }}
        />
        <GapHorizontal times={3} />
        <div css={{ fontFamily: "Poppins", fontSize: 18, fontWeight: 500 }}>
          Logout
        </div>
      </div>
    </div>
  );
}
