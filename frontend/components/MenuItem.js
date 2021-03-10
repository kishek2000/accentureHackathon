/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { GapHorizontal } from "./GapHorizontal";

export function MenuItem({ selectedScreen, menuItem, handleScreenSelection }) {
  const isSelected = selectedScreen === menuItem.menuItemName;
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        padding: "8px 0px 8px 35px",
        cursor: "pointer",
        "&:hover": {
          opacity: 1,
        },
      }}
      onClick={() => handleScreenSelection(menuItem.menuItemName)}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          "&:hover": {
            opacity: 1,
          },
          zIndex: 1,
        }}
      >
        <img
          src={menuItem.imageUrl}
          css={{
            height: 36,
            width: 36,
            objectFit: "contain",
            opacity: isSelected ? 1 : 0.4,
            transition: "0.8s",
            zIndex: 0,
          }}
        />
        <GapHorizontal times={3} />
        <div
          css={{
            color: menuItem.color,
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: 18,
            opacity: isSelected ? 1 : 0.4,
            transition: "0.8s",
            zIndex: 0,
          }}
        >
          {menuItem.menuItemName[0].toUpperCase() +
            menuItem.menuItemName.slice(1)}
        </div>
      </div>
      {isSelected ? (
        <div
          css={{
            position: "absolute",
            height: "100%",
            width: 6,
            background: menuItem.color,
            left: 0,
          }}
        />
      ) : null}
    </div>
  );
}
