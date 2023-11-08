"use client";

//hooks
import React, { ReactNode, useContext } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

//services
import * as authService from "../../services/authService";

//tanstack query
import { useMutation } from "@tanstack/react-query";

//types
import { AuthContextProps } from "../utilities/types/authContext.types";

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

//TODO: Refactor, Put the Mutations / Queries in a serpeate file

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});

  //mutation
  const loginData = useMutation({
    mutationFn: (loginData: any) => authService.login(loginData),
    onSuccess: (response) => {
      setAuth(response);
      console.log(response);
    },
    onError: () => {
      //TODO: PASS ON OVER TO THE LOGIN COMPONENT AND DISPLAY THE ERROR THERE SOMEHOW?
      console.log("Invalid email or password!");
    },
  });

  const onLoginSubmit = async (data: any) => {
    loginData.mutate(data);
  };

  const authContextData = {
    onLoginSubmit,
    userId: auth._id,
    userEmail: auth.email,
    token: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
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
