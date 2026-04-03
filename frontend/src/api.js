import axios from "axios";

const API = axios.create({
    baseURL: "http://job-tracker-backend-hvt8.onrender.com/api"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = token;
    }
    return req;
});

export default API;