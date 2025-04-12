// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, signup as signupApi } from '../services/authService';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            // loginApi should return { token, user }
            const { token, user } = await loginApi(credentials);
            // Persist to localStorage (client‑only)
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return { token, user };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
        try {
            // signupApi might return user info (no token)
            const data = await signupApi(userData);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Signup failed');
        }
    }
);

const initialState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
        setCredentials(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.status = 'failed';
                state.error = payload;
            })
            .addCase(signup.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(signup.fulfilled, state => {
                state.status = 'succeeded';
            })
            .addCase(signup.rejected, (state, { payload }) => {
                state.status = 'failed';
                state.error = payload;
            });
    },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
