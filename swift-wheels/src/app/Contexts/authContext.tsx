"use client";

//hooks
import React, { ReactNode, createContext, useContext } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

//services
import * as authService from "../../services/authService";

//tanstack query
import { useQuery, useMutation } from "@tanstack/react-query";

//context creation
interface AuthContextProps {
  onLoginSubmit: (data: any) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

//TODO: Refactor

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});

  //mutation
  const loginData = useMutation({
    mutationFn: (loginData: any) => authService.login(loginData),
    onSuccess: (response) => {
      setAuth(response);
    },
    onError: () => {
      //TODO: PASS ON OVER TO THE LOGIN COMPONENT AND DISPLAY THE ERROR THERE SOMEHOW?
      console.log("Invalid email or password!");
    },
  });

  const onLoginSubmit = async (data: any) => {
    try {
      loginData.mutate(data);
    } catch (error) {
      console.log("Invalid email or password!");
    }
  };

  const authContextData = {
    onLoginSubmit,
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
