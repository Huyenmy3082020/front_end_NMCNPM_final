export const formatVND = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
export const generateDisplayId = (id) => {
    return `HD${id.slice(-6).toUpperCase()}`;
};
