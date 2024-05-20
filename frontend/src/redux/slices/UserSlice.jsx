
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




// Define initial state
const initialState = {
    user: null,
    passwordData: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    isUpdated: false,
    users: null,
};





export const updateProfile = createAsyncThunk(
    'api/update/profile',
    async (payload, thunkAPI) => {
        try {
            const req = await axios.put('http://localhost:5000/api/me/update', payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            return req.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.errMessage);
        }
    }
);


export const updatedPassword = createAsyncThunk(
    'user/updatedPassword',
    async (payload, thunkAPI) => {
        try {
            const req = await axios.put(`http://localhost:5000/api/password/update`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            return req.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.errMessage);
        }
    }
);


export const loadUser = createAsyncThunk(
    'api/admin/users',
    async (_, thunkAPI) => {

        try {
            const response = await axios.get('http://localhost:5000/api/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);


// admin 

export const allUsers = createAsyncThunk(
    'user/fetchDetails',
    async (_, thunkAPI) => {

        try {
            const response = await axios.get('http://localhost:5000/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            return response.data.users;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'admin/user/:id',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
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

export const getUserDetails = createAsyncThunk(
    'admin/user/',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/user/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);



export const updateUser = createAsyncThunk(
    'api/admin/update/user',
    async ({ id, formData }, thunkAPI) => {
        try {
            const req = await axios.put(`http://localhost:5000/api/admin/user/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(req.data);
            return req.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.errMessage);
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
        clearUpdateStatus(state) {
            state.isUpdated = false; // Resetovanje isUpdated statusa
        }

    },
    extraReducers: (builder) => {


        builder

            .addCase(updateProfile.pending, (state) => {
                state.loading = true;

            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
                state.user = action.payload;
                state.isUpdated = true;

            })
            .addCase(updateProfile.rejected, (state, action) => {
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
                state.isUpdated = true;
            })

            .addCase(updatedPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })

            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(allUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(allUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;

            })
            .addCase(allUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
                state.users = state.users.filter(user => user._id !== action.meta.arg);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(updateUser.pending, (state) => {
                state.loading = true;

            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isUpdated = true;

            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })





    },
});

// Export actions and reducer
export const { clearErrors, setCurrentUser, clearUpdateStatus } = userSlice.actions;
export default userSlice.reducer;
