"use client";

//hooks
import React, { useContext, createContext, useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

//services
import * as authService from "../../services/authService";

//tanstack query
import { useMutation } from "@tanstack/react-query";

//types
import * as authContextTypes from "../utilities/types/authContext.types";

const AuthContext = createContext<
    authContextTypes.authContextDataTypes | undefined
>(undefined);

//TODO: Refactor, Put the Mutations / Queries in a serpeate file

export const AuthProvider = ({ children }: authContextTypes.propTypes) => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const [invalidLoginData, setInvalidLoginData] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginMutation = useMutation({
        mutationFn: (loginData: any) => authService.login(loginData),
        onError: (error) => {
            console.log("Error logging in!", error);
            setInvalidLoginData(true);
        },
        onSuccess: () => {
            setIsLoggedIn(true);
        },
    });

    const registerMutation = useMutation({
        mutationFn: (registerData: any) => authService.register(registerData),
        onError: (error) => {
            console.log("Error registering!", error);
        },
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
        setIsLoggedIn(false);

        setAuth({});
    };

    useEffect(() => {
        setIsAuthenticated(!!auth.accessToken);
    }, [auth]);

    const authContextData = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        userEmail: auth.email,
        token: auth.accessToken,
        isAuthenticated,
        invalidLoginData,
        isLoggedIn,
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
