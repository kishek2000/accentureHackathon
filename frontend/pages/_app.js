/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import "normalize.css";
import "../styles/fonts.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { useEffect, useReducer } from "react";
import { userAuthenticationReducer, UserContext } from "../context/UserContext";
import { ContentContext, contentDispatcher } from "../context/ContentContext";
import { themeDispatcher, ThemeContext } from "../context/ThemeContext";

function MyApp({ Component, pageProps }) {
  const [user, userDispatch] = useReducer(userAuthenticationReducer, {
    user: {},
  });
  const [content, contentDispatch] = useReducer(contentDispatcher, {});
  const [theme, themeDispatch] = useReducer(themeDispatcher, {});

  useEffect(() => {
    const cachedContent = JSON.parse(localStorage.getItem("content"));
    console.log("cached: ", cachedContent);
    if (cachedContent) {
      contentDispatch({
        type: "reset",
        payload: { ...cachedContent },
      });
    }

    const cachedUser = JSON.parse(localStorage.getItem("user"));
    if (cachedUser) {
      userDispatch({
        type: "reset",
        payload: { ...cachedUser },
      });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeDispatch }}>
      <UserContext.Provider value={{ user, userDispatch }}>
        <ContentContext.Provider value={{ content, contentDispatch }}>
          <Component {...pageProps} />{" "}
        </ContentContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
