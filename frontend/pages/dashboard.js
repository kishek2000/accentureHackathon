/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { GapHorizontal } from "../components/GapHorizontal";
import { useState } from "react";
import { Screen } from "../components/Screen";
import { MenuPanel } from "../components/MenuPanel";

export default function Dashboard() {
  const [selectedScreen, setSelectedScreen] = useState("dashboard");
  const [course, setCourse] = useState();

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
