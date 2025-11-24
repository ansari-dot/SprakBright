// src/services/api.js
import axios from 'axios';
const baseURL =
    import.meta.env.VITE_URL;

const api = axios.create({
    baseURL: baseURL, // Update with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // Token expired or invalid, log out the user
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;