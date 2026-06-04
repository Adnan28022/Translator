import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/AuthSlice';
import translatorReducer from './reducer/TranslatorSlice';
import adminReducer from './reducer/AdminSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        translator: translatorReducer,
        admin: adminReducer
    },
});