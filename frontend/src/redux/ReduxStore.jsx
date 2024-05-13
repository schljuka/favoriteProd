import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from './slices/AuthenticationSlice';
import productReducer from './slices/ProductSlice';


export const store = configureStore({

    reducer: {
        authentication: authenticationReducer,
        product: productReducer,

    }
});

export default store;