import axios from "axios";
import { API_URL } from "const";

export class ApiBase {}

const commonHeaders = {
    "Content-Type": "application/json",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Max-Age": 60,
    "x-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export const axiosUnauthorizedInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: commonHeaders,
});

axiosUnauthorizedInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        ...commonHeaders,
    },
});

export const errorResponseToStr = (error) => {
    if ("details" in error.response.data) {
        return error.response.data.details?.[0] || "";
    } else if ("detail" in error.response.data) {
        return error.response.data.detail;
    } else {
        return "Internal server error";
    }
};
