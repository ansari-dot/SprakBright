
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
export const ASSET_BASE = (baseURL || '').replace(/\/?api$/, '') || 'http://localhost:5000';
const IS_DEV = typeof
import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.DEV;
export const resolveImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (Array.isArray(imageUrl)) {
        imageUrl = imageUrl[0] || '';
    } else if (typeof imageUrl === 'object') {
        imageUrl = imageUrl.url || imageUrl.path || imageUrl.src || imageUrl.filename || imageUrl.image || '';
    }
    let url = String(imageUrl).trim().replace(/\\/g, '/');
    
    // Fix double /api prefix issue
    if (url.includes('/api/api/')) {
        url = url.replace('/api/api/', '/api/');
    }
    
    if (IS_DEV && url.startsWith('http')) {
        if (url.startsWith(baseURL)) return url.replace(baseURL, '');
        if (url.startsWith(ASSET_BASE)) return url.replace(ASSET_BASE, '');
        return url;
    }
    if (url.startsWith('http')) return url;

    // Normalize to start with '/uploads' or '/api' where possible
    if (url.startsWith('uploads')) url = `/${url}`;

    // In dev, prefer relative paths so Vite proxy serves from same origin
    if (IS_DEV) {
        if (url.startsWith('/api/uploads')) return url.replace(/^\/api/, '');
        if (url.startsWith('/api')) return url;
        if (url.startsWith('/uploads')) return url;
        if (url.startsWith('/')) return url;
        return `/uploads/${url}`;
    }

    // Production: return absolute URLs
    if (url.startsWith('/api')) return `${baseURL}${url}`;
    if (url.startsWith('/uploads')) return `${ASSET_BASE}${url}`;
    if (url.startsWith('/')) return `${ASSET_BASE}${url}`;
    // bare filenames or paths → assume served under /uploads
    return `${ASSET_BASE}/uploads/${url}`;
};
