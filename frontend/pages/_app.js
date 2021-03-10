/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import "normalize.css";
import "../styles/fonts.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { useEffect, useReducer } from "react";
import { userAuthenticationReducer, UserContext } from "../context/UserContext";
import { ContentContext, contentDispatcher } from "../context/ContentContext";

function MyApp({ Component, pageProps }) {
  const [user, userDispatch] = useReducer(userAuthenticationReducer, {
    user: {},
  });
  const [content, contentDispatch] = useReducer(contentDispatcher, {});

  useEffect(() => {
    const cachedContent = JSON.parse(localStorage.getItem("content"));
    console.log("cached: ", cachedContent);
    if (cachedContent) {
      contentDispatch({
        type: "reset",
        payload: { ...cachedContent },
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <ContentContext.Provider value={{ content, contentDispatch }}>
        <Component {...pageProps} />{" "}
      </ContentContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
