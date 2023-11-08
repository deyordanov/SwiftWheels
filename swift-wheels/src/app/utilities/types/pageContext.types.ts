import { Dispatch, SetStateAction } from "react";

export type PageContextDataTypes = {
  header: boolean;
  setHeader: Dispatch<SetStateAction<boolean>>;
  navigation: boolean;
  setNavigation: Dispatch<SetStateAction<boolean>>;
  isLoginOpen: boolean;
  setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
  isLogoutOpen: boolean;
  setIsLogoutOpen: Dispatch<SetStateAction<boolean>>;
  handleNavigation: () => void;
  handleLoginDialogExitOpen: () => void;
  handleLogoutDialogExitOpen: () => void;
};
