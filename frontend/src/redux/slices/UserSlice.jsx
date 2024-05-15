
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Define initial state
const initialState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
};



export const updateUser = createAsyncThunk(
    'api/me/update',
    async (payload, thunkAPI) => {
        try {
            const user = thunkAPI.getState().user.user; // Dobijamo trenutno prijavljenog korisnika iz stanja
            const req = await axios.put('http://localhost:5000/api/me/update', { ...payload, user });
            return req.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updatedPassword = createAsyncThunk(
    'api/password/update',
    async (userData, thunkAPI) => {
        try {
            const user = thunkAPI.getState().user.user; // Dobijamo trenutno prijavljenog korisnika iz stanja
            const req = await axios.put('http://localhost:5000/api/password/update', { ...userData, user });
            return req.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

// Define user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearErrors(state) {
            state.error = null;
        },
        setCurrentUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {


        builder


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
            })

            // existing reducers...
            .addCase(updatedPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updatedPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

// Export actions and reducer
export const { clearErrors, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;

