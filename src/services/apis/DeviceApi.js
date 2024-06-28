import { api } from "./configs/axiosConfig";

export const deviceApi = {
    getDevices: async function (page,rowPerPage,building,room,status) {
        try {
            const response = await api.get(`/device/show?page=${page + 1}`, {params: {rowPerPage, building, room, status}});
            return response.data.devices;
        } catch (error) {
            throw error.response.data;   
        }
    },
    updateDevice: async function (device_id, MAC_address, room, building){
        const id = parseInt(device_id);
        try {
            const response = await api.post('/device/update', {id, MAC_address, room, building});
            return response.data.message;
        } catch (error) {
            throw error.response.data;   
        }
    },
    deleteDevice: async function (device_id){
        const id = parseInt(device_id);
        try {
            const response = await api.post('/device/delete', {id});
            return response.data.message;
        } catch (error) {
            throw error.response.data;   
        }
    }
}