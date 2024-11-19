import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Если получили 401 и это первый повтор запроса
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    // Если нет refresh токена, перенаправляем на страницу логина
                    window.location.href = '/login/';
                    return Promise.reject(error);
                }

                // Пытаемся обновить access токен
                const response = await axios.post('http://192.168.1.122:8000/api/token/refresh/', {
                    refresh: refreshToken,
                });

                // Сохраняем новый access токен
                localStorage.setItem('access_token', response.data.access);

                // Обновляем заголовки
                axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;

                // Повторяем оригинальный запрос с новым токеном
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Если обновление не удалось, перенаправляем на страницу логина
                console.error('Ошибка обновления токена:', refreshError);
                window.location.href = '/login/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
