


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    loading: true,
    error: false,
    products: [],
    selectedProduct: {},
    pagingInformation: null
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
            return req.data.page;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const addProduct = createAsyncThunk(
    '/admin/product/new',
    async (productData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:5000/api/admin/product/new', productData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${localStorage.getItem('token').replace('"','')}`
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            return response.data.product;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const deleteProduct = createAsyncThunk(
    'admin/product/:id',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/product/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.success;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.errMessage);
        }
    }
);






export const getAdminProducts = createAsyncThunk(
    'api/admin/products',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/products',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
            return response.data.products;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const updateProduct = createAsyncThunk(
    'admin/product/update',
    async ({ id, updatedProductData }, thunkAPI) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/admin/product/${id}`, updatedProductData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.product;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);





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
                state.error = false;
                state.products = action.payload;
                state.pagingInformation = {
                    totalCount: action.payload.totalCount,
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    limit: action.payload.limit,
                    pageCount: action.payload.pageCount,
                },
                    state.loading = false;
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


            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.error = false;
                state.products.push(action.payload);
                state.loading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })




            .addCase(getAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.products = action.payload;
            })
            .addCase(getAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
                state.products = state.products.filter(product => product._id !== action.meta.arg);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = false;
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                // state.products = action.payload;
                state.selectedProduct = action.payload;
            })

            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });



    }
});

export default productSlice.reducer;

