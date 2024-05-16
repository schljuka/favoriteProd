


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    loading: true,
    error: false,
    order: null, // Drži trenutno izabranu narudžbu
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
            const response = await axios.get('http://localhost:5000/api/admin/orders');
            return response.data.orders;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
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
                state.loading = true;
                state.error = null;
            })
            .addCase(allOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.orders = action.payload;
            })
            .addCase(allOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;
