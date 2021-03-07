/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useReducer } from "react";
import { LoginWindow } from "../components/LoginWindow";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { userAuthenticationReducer, UserContext } from "../context/UserContext";

export default function Home() {
  return (
    <main
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          "linear-gradient(139.72deg, #E1E0FF 11.63%, #FDDDDD 44.53%, #FFFCDE 77.06%)",
      }}
    >
      <LoginWindow />
    </main>
  );
}
