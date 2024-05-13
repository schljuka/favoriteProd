import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    loading: true,
    error: false,
    products: [],
   
}

export const fetchAllProducts = createAsyncThunk(
    'product/all',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
         
            return response.data.products;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // Dodaj reducer ako budeš trebao
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || true;
            });
    }
});

export const selectProducts = (state) => state.product.products;
export const selectLoading = (state) => state.product.loading;
export const selectError = (state) => state.product.error;

export default productSlice.reducer;
