import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const defaultState = {
  current: "0",
  previous: null,
  operation: null,
  equals: false,
  credit: "Created by",
};

const AppContext = ({ reducer, children }) => {
  // const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <GlobalContext.Provider value={useReducer(reducer, defaultState)}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
