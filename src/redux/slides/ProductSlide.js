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

            state.products.push(action.payload);
        },
        upsertProduct: (state, action) => {
            console.log(action.payload);
            const index = state.products.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            } else {
                state.products.push(action.payload);
            }
        },
        updateProduct: (state, action) => {
            const updatedProduct = action.payload;
            console.log(updatedProduct);
            const index = state.products.findIndex((p) => p._id === updatedProduct._id);
            if (index !== -1) {
                state.products[index] = updatedProduct; // ✅ Cập nhật toàn bộ dữ liệu sản phẩm
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((p) => p._id !== action.payload);
        },
        // deleteteAll
        deleteAllProducts: (state) => {
            state.products = [];
        },
    },
});

export const { addProduct, upsertProduct, deleteProduct, deleteAllProducts, updateProduct } = productSlice.actions;

export default productSlice.reducer;
