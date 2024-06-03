import { api } from "./configs/axiosConfig";

export const commonApi = {
    getCourseClassDetails: async function (class_code) {
        try {
            const response = await api.post('/course-class-details',{class_code});
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    getStudentDetails: async function (student_code) {
        try {
            const response = await api.post('/student-details',{student_code});
            return response.data.student;   
        } catch (error) {
            throw error.response.data;
        }
    }
}