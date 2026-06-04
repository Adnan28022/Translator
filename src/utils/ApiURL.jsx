import axios from 'axios';

const API = axios.create({
    baseURL: "https://translator-backend-taupe.vercel.app/api",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

export default API;