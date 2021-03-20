/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { SettingsScreen } from "./SettingsScreen";
import { AboutScreen } from "./AboutScreen";
import { CoursesScreen } from "./CoursesScreen";
import { DashboardScreen } from "./DashboardScreen";

export function Screen({ selectedScreen }) {
  switch (selectedScreen) {
    case "dashboard":
      return <DashboardScreen />;
    case "courses":
      return <CoursesScreen />;
    case "about":
      return <AboutScreen />;
    case "settings":
      return <SettingsScreen />;
    default:
      return null;
  }
}
