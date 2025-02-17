import axios from 'axios';
import axiosInstance from '../ultil/axios';
import { logout } from '../redux/slides/UserSlideV1';
import { store } from '../redux/store';
import { axiosJWT } from '.';

// 🌟 Interceptor request: Không cần chỉnh sửa
axiosJWT.interceptors.request.use(
    async (config) => config,
    (error) => Promise.reject(error),
);

axiosJWT.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await refreshToken();
                console.log('✅ Token đã được refresh, thử gọi lại request');

                return axiosJWT(originalRequest); // Retry request với cookie mới
            } catch (refreshError) {
                console.error('❌ Refresh token thất bại, đăng xuất người dùng...');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);

export const getDetailUser = async () => {
    try {
        const res = await axiosJWT.get(`/user/getUser`);
        console.log('✅ Lấy thông tin user thành công:', res.data);
        return res.data;
    } catch (error) {
        if (error.response?.status === 403) {
            console.log('⚠️ Token có thể hết hạn, thử refresh...');
            try {
                await refreshToken();
                return axiosJWT.get(`/user/getUser`);
            } catch {
                console.error('❌ Refresh token hết hạn, logout user');
                store.dispatch(logout());
            }
        }
        console.error('❌ Lỗi khi lấy thông tin user:', error);
        throw new Error('Failed to fetch user details');
    }
};

export const refreshToken = async () => {
    try {
        const res = await axiosInstance.post('/user/refreshtoken', {}, { withCredentials: true });
        console.log('✅ Token đã được refresh:', res);
        return res.data;
    } catch (error) {
        console.error('❌ Refresh token thất bại:', error);
        if (error.response?.status === 403) {
            console.error('❌ Refresh token hết hạn, logout ngay');
            store.dispatch(logout()); // 🚀 Đăng xuất ngay nếu refresh hết hạn
        }
        throw error;
    }
};

// 🔥 API logout
export const logoutUser = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}user/logout`, {}, { withCredentials: true });
        store.dispatch(logout());
        console.log('�� Đăng xuất thành công:', res.data);
        return res.data;
    } catch (error) {
        console.error('❌ Lỗi khi logout:', error);
        throw error;
    }
};
export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}user/sign-in`, data, {
        withCredentials: true,
    });
    return res.data;
};

export const signUpUser = async (data) => {
    console.log(data);
    const res = await axios.post(`http://localhost:2000/user/sign-up`, data);
    return res.data;
};
export const getAllUser = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}user/getAll`);
    return res.data;
};
