"use client";

//hooks
import React, { ReactNode, useContext, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

//services
import * as authService from "../../services/authService";

//tanstack query
import { useMutation } from "@tanstack/react-query";

//types
import * as authContextTypes from "../utilities/types/authContext.types";

const AuthContext = React.createContext<
  authContextTypes.AuthContextDataTypes | undefined
>(undefined);

//TODO: Refactor, Put the Mutations / Queries in a serpeate file

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [invalidLoginData, setInvalidLoginData] = useState(false);

  //mutations
  const loginMutation = useMutation({
    mutationFn: (loginData: any) => authService.login(loginData),
    onError: () => {
      setInvalidLoginData(true);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (registerData: any) => authService.register(registerData),
  });

  const onLoginSubmit = async (
    data: any,
    handleLoginDialogExitOpen: () => void
  ) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setAuth(response);
        setInvalidLoginData(false);
        handleLoginDialogExitOpen();
      },
    });
  };

  const onRegisterSubmit = async (data: any, handleLogin: () => void) => {
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        setAuth(response);
        handleLogin();
      },
    });
  };

  const onLogout = async () => {
    //Cant use a mutation -> the logout func does not return a promise
    authService.logout();

    setAuth({});
  };

  const authContextData = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    userId: auth._id,
    userEmail: auth.email,
    token: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
    invalidLoginData,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
