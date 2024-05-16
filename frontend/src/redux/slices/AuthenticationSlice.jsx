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
    user: JSON.parse(localStorage.getItem('user')) ?? null,
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




export const loginUser = createAsyncThunk(
    'api/login',
    async (user, thunkAPI) => {
        try {
            const req = await axios.post('http://localhost:5000/api/login', user);

            return req.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            const req = await axios.get('http://localhost:5000/api/logout');

            return req.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.req.data);
        }
    }
);






// Define user slice
const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        clearErrors(state) {
            state.error = null;
        },
        authenticateUser(state, action) {
            state.user = action.payload.user;
            state.isAuthenticated = true;
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
                state.user = action.payload.user;

                localStorage.setItem('user', JSON.stringify(state.user))
                localStorage.setItem('token', action.payload.token)

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    },
});

// Export actions and reducer
export const { clearErrors, authenticateUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;

