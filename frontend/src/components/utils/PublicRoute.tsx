// import react and hooks
import React from 'react';
import { Navigate } from 'react-router-dom';

// import auth validation hook
import { validateAuthToken } from '../../hooks/validateAuthToken';

// public route
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = validateAuthToken();

    if (isAuthenticated) {
        // If logged in and token is valid, redirect away from auth pages to dashboard
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};