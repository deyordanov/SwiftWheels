//types
import React from "react";

export type AuthContextDataTypes = {
    onLoginSubmit: (
        data: LoginData,
        handleLoginDialogExitOpen: () => void
    ) => Promise<void>;
    onRegisterSubmit: (
        data: RegisterData,
        handleRegisterDialogExitOpen: () => void
    ) => Promise<void>;
    onLogout: () => Promise<void>;
    userId: string;
    userEmail: string;
    token: string;
    isAuthenticated: boolean;
    invalidLoginData: boolean;
    isLoggedIn: boolean;
};

export type PropTypes = {
    children: React.ReactNode;
};

export type LoginData = {
    email: string;
    password: string;
};

export type RegisterData = {
    email: string;
    password: string;
    "confirm-password": string;
    conditions: boolean;
};
