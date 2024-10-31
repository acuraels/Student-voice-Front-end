import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.122:8000/',
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
});

export default axiosInstance;
