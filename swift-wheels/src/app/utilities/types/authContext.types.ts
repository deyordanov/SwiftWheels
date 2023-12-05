//types
import React from "react";

export type authContextDataTypes = {
    onLoginSubmit: (
        data: any,
        handleLoginDialogExitOpen: () => void
    ) => Promise<void>;
    onRegisterSubmit: (
        data: any,
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

export type propTypes = {
    children: React.ReactNode;
};
