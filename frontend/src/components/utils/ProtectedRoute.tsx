// import react and hooks
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// import auth validation hook
import { validateAuthToken } from '../../hooks/validateAuthToken';

// protected route
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = validateAuthToken();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect them to the login page, but save the current location they were
        // trying to go to when they were redirected.
        return <Navigate to="/get-started" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};