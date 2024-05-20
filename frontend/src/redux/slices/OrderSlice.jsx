


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    loading: true,
    error: false,
    order: null,
    selectedOrder: [], // Drži trenutno izabranu narudžbu
    orders: [], // Drži sve narudžbe
};


//STANISLAV
export const createOrder = createAsyncThunk(
    '/api/order/new',
    async ({ orderItems }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/order/new', { orderItems },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${localStorage.getItem('token').replace('"','')}`
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            return response.data.order;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const allOrders = createAsyncThunk(
    '/api/admin/orders',
    async (_, { rejectWithValue }) => {
        try {

            const response = await axios.get('http://localhost:5000/api/admin/orders', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            return response.data.orders;
        } catch (error) {

            return rejectWithValue(error);
        }
    }
);


export const deleteOrder = createAsyncThunk(
    '/api/admin/orders/:id',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/order/${id}`, {
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

export const getOrderDetails = createAsyncThunk(
    '/admin/order/:id',
    async (id, thunkAPI) => {
        try {

            const response = await axios.get(`http://localhost:5000/api/order/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });


            return response.data.order;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.errMessage);
        }
    }
);



export const myOrders = createAsyncThunk(
    '/me/order',
    async (_, thunkAPI) => {
        try {

            const response = await axios.get(`http://localhost:5000/api/orders/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.orders;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.errMessage);
        }
    }
);









const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // Dodajte potrebne reducere ako ih budete kasnije koristili
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(allOrders.pending, (state) => {
                state.loading = false;
                state.error = false;
                // state.orders = action.payload; // Ispravljeno ovdje
            })
            .addCase(allOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.orders = action.payload;
            })
            .addCase(allOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
                state.orders = state.orders.filter(order => order._id !== action.meta.arg);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.selectedOrder = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(myOrders.pending, (state) => {
                state.loading = false;
                state.error = false;

            })
            .addCase(myOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.orders = action.payload;
            })
            .addCase(myOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default orderSlice.reducer;
