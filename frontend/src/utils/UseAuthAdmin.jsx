

export const useAuthAdmin = () => {
    const user = localStorage.getItem('user');

    if (user) {
        try {
            const userObj = JSON.parse(user);
            if (userObj.role === "admin") {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage", error);
            return false;
        }
    } else {
        return false;
    }
};
