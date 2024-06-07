import { api } from "./configs/axiosConfig";

export const studentApi = {
    getStudentClass: async function () {
        try {
            const response = await api.get('/student/class',);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error.response.data;   
        }
    },
}