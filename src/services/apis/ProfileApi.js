import { getLocalItem } from "../../stores/LocalStorage";
import { api } from "./configs/axiosConfig";

const link_api = {
    "student" : "/student/profile",
    "teacher" : "/teacher/profile",
    "admin" : "/admin/profile",
}

export const profileAPI = {
    get: async function () {
        try {
            const response = await api.get(link_api[getLocalItem('role')]);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async function (data) {
        console.log("data",data);
        var formData = new FormData();
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('home_town', data.home_town);
        formData.append('avatar', data.avatar);
        formData.append('_method', 'PUT');
        console.log(formData);
        try {
            const response = await api.post(link_api[getLocalItem('role')], formData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    getLoginHistories: async function (data){
        const sendData = {
            startDate: data.startDate.format("YYYY-MM-DD"),
            endDate: data.endDate.format("YYYY-MM-DD"),
        }
        try {
            const response = await api.get("profile/histories",{ params: sendData });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
}
