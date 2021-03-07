/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import "normalize.css";
import "../styles/fonts.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { userAuthenticationReducer, UserContext } from "../context/UserContext";
import { useReducer } from "react";

function MyApp({ Component, pageProps }) {
  const [user, dispatch] = useReducer(userAuthenticationReducer, {
    user: {},
  });
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <Component {...pageProps} />{" "}
    </UserContext.Provider>
  );
}

export default MyApp;
