import axios from "axios";

// Manish -> we are creating a utility to send request from frontend to backend 

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, header, params) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData ? bodyData : null,
        headers: header ? header : null,
        params: params ? params : null,
    })
}