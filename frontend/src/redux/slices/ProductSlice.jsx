


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    loading: true,
    error: false,
    products: [],
    selectedProduct: [],
    pagingInformation: null, // Dodajemo polje za trenutno izabrani proizvod
}

export const fetchAllProducts = createAsyncThunk(
    'api/products',
    async (_, thunkAPI) => { // Uklanjamo nepotrebni payload
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            return response.data.products;
        } catch (error) {
            return thunkAPI.rejectWithValue(error); // Direktno vraćamo objekat greške
        }
    }
);

export const getProductDetails = createAsyncThunk(
    'api/product',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/product/${id}`);

            return response.data.product;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const queryProducts = createAsyncThunk(
    'products/query',
    async (payload, thunkAPI) => {
        try {
            const req = await axios.get(`http://localhost:5000/api/products/query${payload}`);
console.log(req);
            return req.data.page;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)




const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // Dodajemo potrebne reducere ako ih budeš kasnije koristio
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
            })
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.selectedProduct = action.payload;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(queryProducts.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(queryProducts.fulfilled, (state, action) => {

                state.error = false;
                state.products = action.payload.items;
                state.pagingInformation = {
                    totalCount: action.payload.totalCount,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    limit: action.payload.limit,
                    pageCount: action.payload.pageCount,
                },
                    state.loading = false;
            })
            .addCase(queryProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



    }
});

export default productSlice.reducer;