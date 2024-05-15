import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from './slices/AuthenticationSlice';
import productReducer from './slices/ProductSlice';
import orderReducer from "./slices/OrderSlice";
import userReducer from "./slices/UserSlice"


export const store = configureStore({

    reducer: {
        authentication: authenticationReducer,
        user: userReducer,
        product: productReducer,
        order: orderReducer,
    }
});

export default store;