import { useReducer, createContext } from "react";
import { user } from "../reducers/user";

// create context
const Context = createContext({});

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(user);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
