import { createContext } from "react";

export const UserContext = createContext(null);

export function userAuthenticationReducer(state, action) {
  switch (action.type) {
    case "authenticated":
      return {
        ...state,
        user: {
          token: action.payload.token,
          userId: action.payload.user_id,
        },
      };
    case "authenticated-child":
      var newChildrenArray = [];
      const existingChildren = state.user?.children;
      if (existingChildren) {
        newChildrenArray = existingChildren.push(action.payload);
      } else {
        newChildrenArray.push(action.payload);
      }
      console.log(newChildrenArray);
      return {
        ...state,
        user: {
          children: newChildrenArray,
        },
      };
    case "logout":
      return {
        ...state,
        user: {},
      };
    default:
      break;
  }
}
