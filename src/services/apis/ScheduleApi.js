import { api } from "../../configs/axiosConfig";
import { getLocalItem } from "../../stores/LocalStorage";

const link_api = {
    student: {
        month: "/student/schedule-in-month",
        week: "/student/schedule-in-week",
        day: "/student/schedule-in-day"
    },
    teacher: {
        month: "/teacher/schedule-in-month",
        week: "/teacher/schedule-in-week",
        day: "/teacher/schedule-in-day"
    }
};
export const scheduleApi = {
    getScheduleInMonth: async function (date) {
        try {
            const response = await api.get(`${link_api[getLocalItem('role')]["month"]}?date=${date}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    getScheduleInWeek: async function (date) {
        try {
            const response = await api.get(`${link_api[getLocalItem('role')]["week"]}?date=${date}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    getScheduleInDay: async function (date) {
        try {
            const response = await api.get(`${link_api[getLocalItem('role')]["day"]}?date=${date}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
}