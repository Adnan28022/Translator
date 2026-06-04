import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthLayout from '../layout/AuthLayout';

import Login from '../auth/Login';
import Register from '../auth/Signup';
import ForgotPassword from '../auth/ForgotPassword';
import VerifyOTP from '../auth/VerifyOTP';
import ResetPassword from '../auth/ResetPassword';
import TranslatorPage from '../pages/TranslatorPage';
import AdminLayout from '../layout/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="verify-otp" element={<VerifyOTP />} />
                <Route path="reset-password" element={<ResetPassword />} />
            </Route>
            {/* Main App Page (Login ke baad yahan bhejenge) */}
            <Route path="/dashboard" element={<TranslatorPage />} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;