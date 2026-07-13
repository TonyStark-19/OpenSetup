// import react and hooks
import React from 'react';
import { Navigate } from 'react-router-dom';

// public route
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('authToken');

    if (token) {
        // If logged in, redirect away from auth pages to dashboard
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};