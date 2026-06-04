import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/ApiURL';

export const getAdminStats = createAsyncThunk('admin/stats', async (_, { rejectWithValue }) => {
    try {
        const res = await API.get('/admin/stats');
        return res.data;
    } catch (err) { return rejectWithValue(err.response.data); }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: { stats: null, loading: false },
    extraReducers: (builder) => {
        builder.addCase(getAdminStats.fulfilled, (state, action) => {
            state.stats = action.payload;
        });
    }
});

export default adminSlice.reducer;