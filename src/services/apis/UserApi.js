import { api } from "./configs/axiosConfig";

export const userApi = {
    getTable: async function (data, page) {
        try {
            const response = await api.get(`users/list?page=${page + 1}`, { params: data });
            return response.data;
        } catch (e) {
            throw e.response.data;
        }
    },
    getUser: async function (userId) {
        try {
            const response = await api.get(`users/${userId}`);
            return response.data;
        } catch (e) {
            throw e.response.data;
        }
    },
    createUser: async function (data) {
        var formData = new FormData();
        formData.append('username', data.username);
        formData.append('name', data.name);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        formData.append('phone_number', data.phone_number);
        formData.append('avatar', data.avatar);
        formData.append('status', data.status);
        try {
            const response = await api.post('users/store', formData);
            return response.data;
        } catch (e) {
            throw e.response.data;
        }
    },
    updateUser: async function (data, id) {
        var formData = new FormData();
        formData.append('id', id);
        formData.append('username', data.username);
        formData.append('name', data.name);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        formData.append('phone_number', data.phone_number);
        formData.append('avatar', data.avatar);
        formData.append('status', data.status);
        formData.append('_method', 'PUT');
        try {
            const response = await api.post(`users/${id}`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    deleteUser: async function (id) {
        try {
            const response = await api.delete(`users/${id}`);
            return response.data;
        } catch (err) {
            throw err.response.data;
        }
    },
    deleteAllUser: async function (data) {
        try {
            const response = await api.delete('users/deleteAll', { params: data });
            return response.data;
        } catch (err) {
            throw err.response.data;
        }
    },
    getLoginHistories: async function (data,id) {
        const sendData = {
            startDate: data.startDate.format("YYYY-MM-DD"),
            endDate: data.endDate.format("YYYY-MM-DD"),
        }
        try {
            const response = await api.get(`users/${id}/histories`, { params: sendData });
            return response.data;
        } catch (err) {
            throw err.response.data;
        }
    },
    getUserPermissions: async function () {
        try {
            const response = await api.get('permissions');
            return response.data;
        } catch (err) {
            throw err.response.data;
        }
    },
    userPermissionsEdit: async function (sendData) {
        try {
            const response = await api.post('permissions', sendData);
            return response.data;
        } catch (err) {
            throw err.response.data;
        }
    }
}