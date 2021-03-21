import { createContext } from "react";

export const ThemeContext = createContext(null);

export function themeDispatcher(state, action) {
  switch (action.type) {
    case "toggleDark":
      return {
        ...state,
        dark: true,
      };
    case "toggleLight":
      return {
        ...state,
        dark: false,
      };
    default:
      break;
  }
}
