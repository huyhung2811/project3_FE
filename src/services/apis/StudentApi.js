import { api } from "../../configs/axiosConfig";

export const studentApi = {
    getStudentClass: async function () {
        try {
            const response = await api.get('/student/class',);
            return response.data;
        } catch (error) {
            throw error.response.data;   
        }
    },
}