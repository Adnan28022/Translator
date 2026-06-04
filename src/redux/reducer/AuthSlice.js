import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/ApiURL';

// --- Async Thunks ---

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const res = await API.post('/auth/register', userData);
        return res.data;
    } catch (err) { return rejectWithValue(err.response.data); }
});

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (otpData, { rejectWithValue }) => {
    try {
        const res = await API.post('/auth/verify-otp', otpData);
        return res.data;
    } catch (err) { return rejectWithValue(err.response.data); }
});

export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
    try {
        const res = await API.post('/auth/login', userData);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data;
    } catch (err) { return rejectWithValue(err.response.data); }
});

// 1. FORGOT PASSWORD THUNK
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
    try {
        const res = await API.post('/auth/forgot-password', { email });
        return res.data; // Backend returns { msg: "Reset OTP sent to email" }
    } catch (err) { return rejectWithValue(err.response.data); }
});

// 2. RESET PASSWORD THUNK
export const resetPassword = createAsyncThunk('auth/resetPassword', async (data, { rejectWithValue }) => {
    try {
        // data contains: { email, otp, newPassword }
        const res = await API.post('/auth/reset-password', data);
        return res.data; // Backend returns { msg: "Password updated successfully" }
    } catch (err) { return rejectWithValue(err.response.data); }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
        success: false,
        message: null // Extra message store karne ke liye
    },
    reducers: {
        logout: (state) => {
            localStorage.clear();
            state.user = null;
            state.token = null;
            state.error = null;
            state.success = false;
        },
        resetAuth: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => { state.loading = true; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
                state.success = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.msg || "Login Failed";
            })

            // Register
            .addCase(registerUser.pending, (state) => { state.loading = true; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload?.msg;
            })

            // Verify OTP
            .addCase(verifyOTP.pending, (state) => { state.loading = true; })
            .addCase(verifyOTP.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })

            // Forgot Password
            .addCase(forgotPassword.pending, (state) => { state.loading = true; })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload?.msg;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.msg || "Failed to send OTP";
            })

            // Reset Password
            .addCase(resetPassword.pending, (state) => { state.loading = true; })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload?.msg;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.msg || "Password reset failed";
            });
    }
});

export const { logout, resetAuth } = authSlice.actions;
export default authSlice.reducer;