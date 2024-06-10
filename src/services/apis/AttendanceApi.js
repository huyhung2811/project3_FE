import { api } from "./configs/axiosConfig";

export const attendanceApi = {
    getClassAttendance: async function (class_code) {
        try {
            const response = await api.post('/student/attendance',{class_code});
            return response.data.attendances;
        } catch (error) {
            throw error.response.data;   
        }
    },
    getStudentAttendanceByDay: async function (class_code, day) {
        try {
            const response = await api.post('/student/attendance-by-day',{class_code, day});
            return response.data.attendances;
        } catch (error) {
            throw error.response.data;   
        }
    },
    getClassAttendanceByDay: async function (class_code, day) {
        try {
            const response = await api.post('/attendance',{class_code, day});
            return response.data.attendances;
        } catch (error) {
            throw error.response.data;   
        }
    },
    updateStudentAttendance: async function (attendance_id, status){
        try {
            const response = await api.post('/attendance/update',{attendance_id, status});
            return response.data.message;
        } catch (error) {
            throw error.response.data;   
        }
    }
}