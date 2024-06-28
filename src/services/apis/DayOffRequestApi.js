import { api } from "./configs/axiosConfig";

export const dayOffRequestApi = {
    getTeacherNotifications: async function () {
        try {
            const response = await api.get('/day-off/show');
            return response.data.day_off_request;
        } catch (error) {
            throw error.response.data;
        }
    },
    changeIsReadRequest: async function (request_id) {
        try {
            const response = await api.post('/day-off/change-is-read', {request_id});
            return response.data.message;
        } catch (error) {
            throw error.response.data;
        }
    },
    showRequestDetails: async function (request_id){
        try {
            const response = await api.get('/day-off/request-details',{ params: { request_id }});
            return response.data.request_details;
        } catch (error) {
            throw error.response.data;
        }
    },
    changeRequestStatus: async function (request_id, status){
        try {
            const response = await api.post('/day-off/change-request-status', {request_id,status});
            return response.data.message;
        } catch (error) {
            throw error.response.data;
        }
    },
    createRequest: async function (class_code, day, reason) {
        try {
            const response = await api.post('/day-off/create', {class_code,day, reason});
            return response.data.message;
        } catch (error) {
            throw error.response.data;
        }
    }
}