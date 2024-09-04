import React from "react";
import { useState } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [isChef, setChef] = useState(false);

  return (
    <Context.Provider value={{ isChef: [isChef, setChef] }}>
      {children}
    </Context.Provider>
  );
};
