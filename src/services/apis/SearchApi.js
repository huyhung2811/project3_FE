import { api } from "./configs/axiosConfig";

export const searchApi = {
    getResult: async function (input, type) {
        try {
            const response = await api.post(`/search/${type}`,{input});
            return response.data;
        } catch (error) {
            throw error.response.data;   
        }
    },
}