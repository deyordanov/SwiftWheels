import React from "react";

export interface AuthContextProps {
  onLoginSubmit: (
    data: any,
    handleLoginDialogExitOpen: Function
  ) => Promise<void>;
  onLogout: () => Promise<void>;
  userId: string;
  userEmail: string;
  token: string;
  isAuthenticated: boolean;
  invalidLoginData: boolean;
}
