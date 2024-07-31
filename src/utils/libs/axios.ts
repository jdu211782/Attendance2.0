import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/sign-in", // Замените на ваш реальный API URL
    withCredentials: false,
});

// Добавляем перехватчик для включения токена в заголовок
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Предполагается, что токен хранится в localStorage после входа
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;