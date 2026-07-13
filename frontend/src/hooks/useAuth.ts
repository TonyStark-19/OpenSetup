// import hooks
import { useState, useEffect } from "react";

// useauth hook
export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        return !!localStorage.getItem("authToken");
    });

    useEffect(() => {
        // Function to synchronize state changes across windows/tabs
        const checkAuth = () => {
            setIsLoggedIn(!!localStorage.getItem("authToken"));
        };

        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        window.location.href = "/get-started";
    };

    return { isLoggedIn, logout };
}