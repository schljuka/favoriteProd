
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';




// Define initial state
const initialState = {
    user: null,
    passwordData: null,
    loading: false,
    isAuthenticated: false,
    error: null,
  
};



// export const updateUser = createAsyncThunk(
//     'auth/update',
//     async (payload, thunkAPI) => {
//         try {
//             const req = await axios.put('http://localhost:5000/api/me/update', payload,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         // 'Authorization': `Bearer ${localStorage.getItem('token').replace('"','')}`
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`
//                     }
//                 }
//             );
//             return req.data.user;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// )

export const updateUser = createAsyncThunk(
    'auth/update',
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
          
            return req.data; // Vraćamo cijeli odgovor s servera
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
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
            console.log(req);
            return req.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message || e.message);
        }
    }
);


export const fetchUserDetails = createAsyncThunk(
    'user/fetchDetails',
    async (_, thunkAPI) => {

        try {
            const response = await axios.get('http://localhost:5000/api/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // console.log(response.data.user.name);
            return response.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || error.message);
        }
    }
);

// export const updatedPassword = createAsyncThunk(
//     'api/password/update',
//     async (payload, thunkAPI) => {
//         try {
//             const user = thunkAPI.getState().user.user;
//            console.log(thunkAPI)
//             const req = await axios.put(`http://localhost:5000/api/password/update`, thunkAPI.getState().passwordData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });

//             return req.data.user;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e);
//         }
//     }
// );



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
            })

            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

// Export actions and reducer
export const { clearErrors, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
