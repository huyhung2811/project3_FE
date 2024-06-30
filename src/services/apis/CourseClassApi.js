import { api } from "../../configs/axiosConfig";

export const courseClassApi = {
    getStudentCourseClasses: async function (date) {
        try {
            const response = await api.get('/student/course-class', { params: { date } });
            return response.data;
        } catch (error) {
            throw error.response.data;   
        }
    },
    getTeacherCourseClasses: async function (date) {
        try {
            const response = await api.get('/teacher/course-class', { params: { date } });
            return response.data;
        } catch (error) {
            throw error.response.data;   
        }
    }
}