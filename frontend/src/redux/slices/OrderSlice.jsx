
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';

// const initialState = {
//     loading: true,
//     error: false,
//     orders: [],
//     selectedOrder: [] // Dodajemo polje za trenutno izabrani proizvod
// }


// export const createOrder = createAsyncThunk(
//     'api/order/new',
//     async (orderData, thunkAPI) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/order/new', orderData);
//             return response.data.order;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );


// const orderSlice = createSlice({
//     name: 'order',
//     initialState,
//     reducers: {
//         // Dodajemo potrebne reducere ako ih budeš kasnije koristio
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(createOrder.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(createOrder.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.error = null;
//                 state.order = action.payload;
//             })
//             .addCase(createOrder.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//     }

// });

// // Selektor za trenutno izabrani proizvod

// export default orderSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    loading: true,
    error: false,
    order: [],

}

//STANISLAV
// export const createOrder = createAsyncThunk(
//     'api/order/new',
//     async ({orderData}, thunkAPI) => {
//         console.log(orderData);
//         try {
//             let authToken = localStorage.getItem('token')
//             const response = await axios.post('http://localhost:5000/api/order/new', orderData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${authToken}`
//                 }
//             });

//             return response.data.order;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );


export const createOrder = createAsyncThunk(
    '/api/order/new',
    async ({ orderItems }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/order/new', { orderItems });
            return response.data.order;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// export const createOrder = createAsyncThunk(
//     'api/order/new',
//     async ({ orderData, authToken }, thunkAPI) => {
//         console.log("orderData:", orderData); // Dodajte ovaj console.log
//         try {
//             const response = await axios.post(
//                 'http://localhost:5000/api/order/new',
//                 orderData,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authToken}`
//                     }
//                 }
//             );
//             return response.data.order;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );


// export const createOrder = createAsyncThunk(
//     'api/order/new',

//     async ({ orderData, authToken }, thunkAPI) => {

//         try { 


//             const response = await axios.post('http://localhost:5000/api/order/new', orderData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${authToken}`
//                 }
//             }
//             );
//             return response.data.order;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        loading: false,
        error: null,
    },
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
    }
});

export default orderSlice.reducer;
