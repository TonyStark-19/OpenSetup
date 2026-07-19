// validate auth
export const validateAuthToken = () => {
    const token = localStorage.getItem("authToken");

    if (!token) return false;

    try {
        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            return false;
        }

        return true;
    } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        return false;
    }
};