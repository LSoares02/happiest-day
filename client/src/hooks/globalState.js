import React, { useContext, useState, createContext } from "react";

import { US, BR, ES } from "country-flag-icons/react/3x2";

const GlobalStateContext = createContext({});

export default function GlobalStateProvider({ children }) {
  const languageIcons = { pt: <BR />, es: <ES />, en: <US /> };

  return (
    <GlobalStateContext.Provider value={{ languageIcons }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }

  return context;
}
