import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log(action.payload);
            const exists = state.products.some((p) => p._id === action.payload._id);
            if (!exists) {
                // ✅ Đảm bảo sản phẩm có inventory trước khi thêm
                state.products.push({
                    ...action.payload,
                    inventory: action.payload.inventory || { stock: 0, status: 'Chưa có hàng' },
                });
            }
        },
        upsertProduct: (state, action) => {
            console.log(action.payload);
            const index = state.products.findIndex((p) => p._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = {
                    ...action.payload,
                    inventory: action.payload.inventory || { stock: 0, status: 'Chưa có hàng' },
                };
            } else {
                state.products.push({
                    ...action.payload,
                    inventory: action.payload.inventory || { stock: 0, status: 'Chưa có hàng' },
                });
            }
        },
        updateProduct: (state, action) => {
            const updatedProduct = action.payload;
            console.log(updatedProduct);
            state.products = state.products.map((p) =>
                p._id === updatedProduct._id
                    ? { ...updatedProduct, inventory: updatedProduct.inventory || { stock: 0, status: 'Chưa có hàng' } }
                    : p,
            );
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((p) => p._id !== action.payload);
        },
        deleteAllProducts: (state) => {
            state.products = [];
        },
    },
});

export const { addProduct, upsertProduct, deleteProduct, deleteAllProducts, updateProduct } = productSlice.actions;

export default productSlice.reducer;
