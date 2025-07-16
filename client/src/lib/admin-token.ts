const TOKEN_KEY = 'admin_access_token';

export const authUtils = {
    getToken: () => {
        return sessionStorage.getItem(TOKEN_KEY);
    },

    setToken: (token: string) => {
        sessionStorage.setItem(TOKEN_KEY, token);
    },

    removeToken: () => {
        sessionStorage.removeItem(TOKEN_KEY);
    },

    hasToken: () => {
        return !!sessionStorage.getItem(TOKEN_KEY);
    }
}; 