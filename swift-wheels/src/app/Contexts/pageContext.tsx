"use client";

//hooks
import React, { ReactNode, useState, useContext } from "react";

//types
import { PageContextDataTypes } from "../utilities/types/pageContext.types";

const PageContext = React.createContext<PageContextDataTypes | undefined>(
  undefined
);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [header, setHeader] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleNavigation = () => {
    setNavigation((state) => !state);
  };

  const handleLoginDialogExitOpen = () => {
    setIsLoginOpen((state) => !state);
    setNavigation(false);
  };

  const handleLogoutDialogExitOpen = () => {
    setIsLogoutOpen((state) => !state);
    setNavigation(false);
  };

  const pageContextData: PageContextDataTypes = {
    header,
    setHeader,
    navigation,
    setNavigation,
    isLoginOpen,
    setIsLoginOpen,
    isLogoutOpen,
    setIsLogoutOpen,
    handleNavigation,
    handleLoginDialogExitOpen,
    handleLogoutDialogExitOpen,
  };

  return (
    <PageContext.Provider value={pageContextData}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);

  if (context === undefined) {
    throw new Error("usePageContext must be used within an AuthProvider");
  }

  return context;
};
