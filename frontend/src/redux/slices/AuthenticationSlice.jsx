
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


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
            const req = await axios.post('http://localhost:5000/api/register', user, {
                headers: {
                    'Content-Type': 'application/json',

                }
            });
            const token = req.data.token;
            if (token) {
                localStorage.setItem('token', token);
            } else {
                console.error('Token is undefined');
            }

            return req.data.user;
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
            const token = req.data.token;
            if (token) {
                localStorage.setItem('token', token);
            } else {
                console.error('Token is undefined');
            }
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
                localStorage.setItem('user', JSON.stringify(action.payload));
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
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
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

