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
    
    // Clean up any double API paths
    if (url.includes('api/api/')) {
        url = url.replace('api/api/', 'api/');
    }
    
    // If URL is already absolute, clean it and return
    if (url.startsWith('http')) {
        // Clean up any potential double slashes
        return url.replace(/([^:]\/)\/+/g, '$1');
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
    if (url.startsWith('/api')) return `${baseURL}${url}`;
    if (url.startsWith('/uploads')) return `${ASSET_BASE}${url}`;
    if (url.startsWith('/')) return `${ASSET_BASE}${url}`;
    
    // Default case for bare filenames or paths
    return `${ASSET_BASE}/uploads/${url}`;
};
