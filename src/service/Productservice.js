import { ConsoleSqlOutlined } from '@ant-design/icons';
import axios from 'axios';
import { axiosJWT } from '.';

// Tạo instance của axios với URL từ biến môi trường
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const createProduct = async (data) => {
    const res = await axiosJWT.post(`ingredient`, data);
    return res.data;
};

export const deleteProduct = async (id) => {
    try {
        const res = await axiosJWT.delete(`ingredient/${id}`);
        return res.data;
    } catch (error) {
        if (error.response) {
            console.error('Lỗi từ server:', error.response.data);
            throw new Error(error.response.data.message || 'Có lỗi xảy ra!');
        } else {
            console.error('Lỗi không xác định:', error.message);
            throw new Error('Có lỗi xảy ra, không thể kết nối với server!');
        }
    }
};

export const updateProduct = async (id, data) => {
    try {
        const res = await axiosJWT.put(`ingredient/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const getAllIngredient = async () => {
    try {
        const res = await axiosInstance.get(`/ingredient`);
        return res;
    } catch (error) {
        throw new Error('L��i khi lấy dữ liệu đơn hàng');
    }
};
