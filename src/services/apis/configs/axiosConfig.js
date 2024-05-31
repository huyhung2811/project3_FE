import axios from "axios";
import { getLocalItem } from "../../../stores/LocalStorage";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
});

api.interceptors.request.use(
    config => {
        if (getLocalItem('token')) {
            config.headers.Authorization = `Bearer ${getLocalItem('token')}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

