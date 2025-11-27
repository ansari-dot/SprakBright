// src/services/api.js
import axios from 'axios';
const baseURL =
    import.meta.env.VITE_URL;
const api = axios.create({
    baseURL,
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
        // Do not globally redirect on 401 to avoid login loops.
        return Promise.reject(error);
    }
);

export default api;
export const ASSET_BASE = (baseURL || '').replace(/\/?api$/, '');
const IS_DEV = typeof
import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.DEV;
export const resolveImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    
    // Handle array or object inputs
    if (Array.isArray(imageUrl)) {
        imageUrl = imageUrl[0] || '';
    } else if (typeof imageUrl === 'object') {
        imageUrl = imageUrl.url || imageUrl.path || imageUrl.src || imageUrl.filename || imageUrl.image || '';
    }
    
    // Convert to string and normalize slashes
    let url = String(imageUrl).trim().replace(/\\/g, '/');
    
    // If URL already contains the full base URL, clean it and return
    if (url.includes('api.sparkbrightcleaning.com')) {
        return url.replace(/([^:]\/)\/+/g, '$1');
    }
    
    // If URL is already absolute, return as is
    if (url.startsWith('http')) {
        return url;
    }
    
    // Handle relative paths
    if (IS_DEV) {
        // In development, use relative paths
        if (url.startsWith('/api/uploads')) return url.replace(/^\/api/, '');
        if (url.startsWith('/api')) return url;
        if (url.startsWith('/uploads')) return url;
        if (url.startsWith('/')) return url;
        return `/uploads/${url}`;
    }
    
    // In production, ensure we don't duplicate the base URL
    if (url.startsWith('/api/') || url.startsWith('/uploads/')) {
        // Remove any leading slashes to prevent double slashes
        const cleanPath = url.replace(/^\/+/, '');
        // Check if the path already includes the base URL
        if (cleanPath.startsWith('api/')) {
            return `https://api.sparkbrightcleaning.com/${cleanPath}`;
        }
        return `https://api.sparkbrightcleaning.com/api/${cleanPath}`;
    }
    
    // Default case for bare filenames or paths
    if (url.startsWith('/')) {
        return `https://api.sparkbrightcleaning.com${url}`;
    }
    
    return `https://api.sparkbrightcleaning.com/api/uploads/${url}`;
};
