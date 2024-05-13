// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';

// const initialState = {
//     isAuthenticated: false,
//     loading: false,
//     error: false,
//     registerSuccess: false
// }

// // login user
// export const loginUser = createAsyncThunk(
//     'api/login',
//     async (user, thunkAPI) => {
//         try {
//             const req = await axios.post('http://localhost:5000/api/login', user);
//             return req.data.user;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// )


// // register user
// export const registerUser = createAsyncThunk(
//     'api/register',
//     async (user, thunkAPI) => {
//         try {
//             const req = await axios.post('http://localhost:5000/api/register', user);
//             return req.data.user
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// )


// // update user
// export const updateUser = createAsyncThunk(
//     'api/me/update',
//     async (payload, thunkAPI) => {
//         try {
//             const req = await axios.put('http://localhost:5000/api/me/update', payload);
//             return req.data.user;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// )




// export const AuthenticationSlice = createSlice({
//     name: "authentication",
//     initialState,
//     reducers: {
//         resetRegisterSuccess(state) {
//             state = {
//                 ...state,
//                 registerSuccess: false,
//             }
//             return state;
//         },
//         resetUser(state, action) {
//             state = {
//                 ...state,
//                 [action.payload]: undefined
//             }
//             return state;
//         }
//     },
//     extraReducers: (builder) => {
//         // pending logic
//         builder.addCase(loginUser.pending, (state, action) => {
//             state = {
//                 ...state,
//                 error: false,
//                 loading: true,
//             }
//             return state;
//         });

//         builder.addCase(registerUser.pending, (state, action) => {
//             state = {
//                 ...state,
//                 error: false,
//                 loading: true,
//             }
//             return state;
//         })

//         builder.addCase(updateUser.pending, (state, action) => {
//             state = {
//                 ...state,
//                 error: false,
//                 loading: true,
//             }
//             return state;
//         })


//         // resolved logic
//         builder.addCase(loginUser.fulfilled, (state, action) => {
//             state = {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: action.payload,
//             }
//             return state;
//         });

//         builder.addCase(registerUser.fulfilled, (state, action) => {
//             state = {
//                 ...state,
//                 loading: false,
//                 registerSuccess: true,
//             }
//             return state;
//         })


//         builder.addCase(updateUser.fulfilled, (state, action) => {
//             state = {
//                 ...state,
//                 isAuthenticated: action.payload,
//                 loading: false
//             }
//             return state;
//         })

//         // rejected logic
//         builder.addCase(loginUser.rejected, (state, action) => {
//             state = {
//                 ...state,
//                 error: true,
//                 loading: false,
//             }
//             return state;
//         })

//         builder.addCase(registerUser.rejected, (state, action) => {
//             state = {
//                 ...state,
//                 // error: true,
//                 error: action.error.message,
//                 loading: false
//             }
//             return state;
//         })


//         builder.addCase(updateUser.rejected, (state, action) => {
//             state = {
//                 ...state,
//                 error: true,
//                 loading: false
//             }
//             return state;
//         })


//     }
// });

// export const { resetRegisterSuccess, resetUser } = AuthenticationSlice.actions;

// export default AuthenticationSlice.reducer;






// -----------------------

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define initial state
const initialState = {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null,
};



export const registerUser = createAsyncThunk(
    'api/register',
    async (user, thunkAPI) => {
        try {
            const req = await axios.post('http://localhost:5000/api/register', user);
            return req.data.user
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)




// export const loginUser = createAsyncThunk(
//     'api/login',
//     async (user, thunkAPI) => {
//         try {
//             const req = await axios.post('http://localhost:5000/api/login', user);
//             return req.data.user;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// )


export const loginUser = createAsyncThunk(
    'api/login',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', user);
            const { token, user: userData } = response.data;
            // Save token in a cookie
            Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
            return userData;
        } catch (error) {
            // Return error value to be handled by Redux Toolkit
            return rejectWithValue(error.response.data);
        }
    }
);


export const updateUser = createAsyncThunk(
    'api/me/update',
    async (payload, thunkAPI) => {
        try {
            const req = await axios.put('http://localhost:5000/api/me/update', payload);
            return req.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

// Define user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearErrors(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {


        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export actions and reducer
export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;

