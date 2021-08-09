import React, { createContext, useReducer, useContext } from "react";

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const userReducer = (state, action) => {
  let userCopy;
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_USER_BUDDIES":
      const { screenname, buddies } = action.payload;
      userCopy = [...state.user];

      const userIndex = userCopy.findIndex((u) => u.screenname === screenname);

      userCopy[userIndex] = { ...userCopy[userIndex], buddies };

      return {
        ...state,
        user: userCopy,
      };
    default:
      throw new Error(`Unknown action type: ${actoin.type}`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider>{children}</UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const useUserState = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);
