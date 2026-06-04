import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/ApiURL';

// 1. Translate Text
export const translateText = createAsyncThunk('translate/text', async (data, { rejectWithValue }) => {
    try {
        const res = await API.post('/translator/translate', data);
        return res.data;
    } catch (err) { return rejectWithValue(err.response.data); }
});

// 2. Fetch User History
export const fetchHistory = createAsyncThunk('translate/history', async (_, { rejectWithValue }) => {
    try {
        const res = await API.get('/translator/history');
        return res.data;
    } catch (err) { return rejectWithValue(err.response.data); }
});

// 3. DELETE History Item (Missing Export Fixed Here)
export const deleteHistoryItem = createAsyncThunk('translate/deleteItem', async (id, { rejectWithValue }) => {
    try {
        await API.delete(`/translator/history/${id}`);
        return id; // Hum ID return kar rahe hain taake state se filter kar sakein
    } catch (err) { return rejectWithValue(err.response.data); }
});

const translatorSlice = createSlice({
    name: 'translator',
    initialState: {
        history: [],
        loading: false,
        currentResult: null,
        error: null
    },
    reducers: {
        clearCurrentResult: (state) => {
            state.currentResult = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Translate
            .addCase(translateText.pending, (state) => { state.loading = true; })
            .addCase(translateText.fulfilled, (state, action) => {
                state.loading = false;
                state.currentResult = action.payload;
                state.history.unshift(action.payload);
            })
            .addCase(translateText.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.msg;
            })

            // Fetch History
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.history = action.payload;
            })

            // Delete History Item Logic
            .addCase(deleteHistoryItem.fulfilled, (state, action) => {
                state.history = state.history.filter(item => item._id !== action.payload);
            });
    }
});

export const { clearCurrentResult } = translatorSlice.actions;
export default translatorSlice.reducer;