import { api } from "./configs/axiosConfig";

export const AuthAPI = {
    login: async function (data) {
        try {
            const response = await api.post("login", data);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    logout: async function () {
        try {
            const response = await api.post("logout", null);
            localStorage.clear();
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
}
