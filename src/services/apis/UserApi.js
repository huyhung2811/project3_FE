import { api } from "../../configs/axiosConfig";

export const userApi = {
    getUsers: async function (page,rowPerPage,role, status) {
        try {
            const response = await api.get(`/user?page=${page + 1}`,{params: {rowPerPage, role, status}});
            return response.data.users;
        } catch (e) {
            throw e.response.data;
        }
    },
    updateUser: async function (user_id, status){
        const id = parseInt(user_id);
        try {
            const response = await api.post('/user/update', {id, status});
            return response.data.message;
        } catch (error) {
            throw error.response.data;   
        }
    },
    deleteUser: async function (user_id){
        const id = parseInt(user_id);
        try {
            const response = await api.post('/user/delete', {id});
            return response.data.message;
        } catch (error) {
            throw error.response.data;   
        }
    }
}