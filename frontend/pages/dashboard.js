/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { GapHorizontal } from "../components/GapHorizontal";
import { useContext, useEffect, useState } from "react";
import { Screen } from "../screens/Screen";
import { MenuPanel } from "../components/MenuPanel";
import { UserContext } from "../context/UserContext";
import { ContentContext } from "../context/ContentContext";

export default function Dashboard() {
  const [selectedScreen, setSelectedScreen] = useState("dashboard");
  const [course, setCourse] = useState();
  const { user } = useContext(UserContext);
  const { content, contentDispatch } = useContext(ContentContext);

  useEffect(() => {
    const previousScreen = localStorage.getItem("dashboardScreen");
    if (previousScreen) {
      setSelectedScreen(previousScreen);
    }
  }, []);

  return (
    <main
      css={{
        display: "flex",
        flexDirection: "row",
        background:
          "radial-gradient(100.31% 100.31% at 100% 100.82%, rgba(255, 255, 255, 0.91) 0%, #F7F7F7 100%)",
      }}
    >
      <MenuPanel
        selectedScreen={selectedScreen}
        setSelectedScreen={setSelectedScreen}
      />
      <GapHorizontal times={15} />
      <Screen selectedScreen={selectedScreen} />
    </main>
  );
}
