import { api } from "./configs/axiosConfig";

export const attendanceApi = {
    getMyAttendance: async function (class_code) {
        try {
            const response = await api.post('/student/attendance',{class_code});
            return response.data.attendances;
        } catch (error) {
            throw error.response.data;   
        }
    },
}