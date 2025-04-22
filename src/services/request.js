import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshAccessToken } from './refreshToken';

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false; // Cờ để kiểm tra xem đã redirect hay chưa
let failedQueue = []; // Hàng đợi cho các yêu cầu thất bại trong khi refresh token

// Hàm xử lý các yêu cầu bị chặn khi refresh token
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Add a request interceptor
request.interceptors.request.use(
    function (config) {
        const accessToken = Cookies.get('authToken') || '';
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            delete request.defaults.headers.common['Authorization'];
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Add a response interceptor
request.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        // Kiểm tra nếu nhận lỗi 401 và không phải là yêu cầu retry
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axios(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const newAccessToken = await refreshAccessToken();

            if (newAccessToken !== null) {
                processQueue(null, newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                isRefreshing = false;
                return axios(originalRequest);
            } else {
                processQueue(new Error('Failed to refresh token'), null);
                isRefreshing = false;

                if (!isRefreshing) {
                    isRefreshing = true;
                    Cookies.remove('authToken');
                    Cookies.remove('refreshToken');

                    // Thêm kiểm tra nếu chưa redirect
                    if (!window.location.href.includes('/login')) {
                        window.location.replace('/login');
                    }
                }
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
);

export const setHeaderConfigAxios = (token) => {
    if (token) {
        request.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : '';
    } else {
        delete request.defaults.headers.common['Authorization'];
    }
};

export default request;
