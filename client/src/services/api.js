// src/services/api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_URL;

const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
});

// Add token automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// No forced redirect on 401
api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default api;

/* ---------------------------------------
   FIXED IMAGE RESOLVER (Final Stable Version)
---------------------------------------- */
export const resolveImageUrl = (imageUrl) => {
    if (!imageUrl) return "";

    // Extract nested values
    if (Array.isArray(imageUrl)) {
        imageUrl = imageUrl[0] || "";
    } else if (typeof imageUrl === "object") {
        imageUrl =
            imageUrl.url ||
            imageUrl.path ||
            imageUrl.src ||
            imageUrl.filename ||
            imageUrl.image ||
            "";
    }

    let url = String(imageUrl).trim().replace(/\\/g, "/");

    // 1️⃣ Remove double /api/api
    url = url.replace("/api/api/", "/api/");

    // 2️⃣ Already absolute (http/https)
    if (url.startsWith("http")) return url;

    // 3️⃣ Ensure leading slash
    if (!url.startsWith("/")) url = "/" + url;

    // 4️⃣ Ensure starts with /api
    if (!url.startsWith("/api")) url = "/api" + url;

    // 5️⃣ Build final correct URL
    return `${baseURL}${url}`;
};
