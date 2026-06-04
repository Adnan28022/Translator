import React, { useState } from 'react';
import { Lock, ShieldAlert, Eye, EyeOff, ArrowRight, KeyRound, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, resetAuth } from '../redux/reducer/AuthSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ResetPassword = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [formData, setFormData] = useState({ otp: '', newPassword: '', confirmPassword: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Forgot Password page se email receive karna
    const email = location.state?.email || "";

    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.otp || !formData.newPassword) {
            return toast.error("Please fill all required fields");
        }

        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        if (formData.newPassword.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        // Backend call
        const result = await dispatch(resetPassword({
            email,
            otp: formData.otp,
            newPassword: formData.newPassword
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            toast.success("Credentials updated! Redirecting to login...");
            dispatch(resetAuth());
            setTimeout(() => navigate('/'), 2000);
        } else {
            toast.error(result.payload?.msg || "Invalid OTP or request expired");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
        >
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-50 rounded-[2.5rem] mb-6 text-purple-600 shadow-inner">
                    <ShieldAlert className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 italic tracking-tight uppercase">
                    Reset <span className="text-purple-600">Key</span>
                </h3>
                <p className="text-slate-500 mt-2 font-medium text-sm">
                    Enter the reset token sent to <span className="font-bold text-slate-800">{email || 'your email'}</span>
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* OTP Field */}
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1 italic">Reset Token (OTP)</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <KeyRound className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="6-digit code"
                            required
                            value={formData.otp}
                            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                            className="block w-full pl-11 pr-4 py-3.5 border border-gray-100 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                        />
                    </div>
                </div>

                {/* New Password Field */}
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1 italic">New Security Key</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                        </div>
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            className="block w-full pl-11 pr-12 py-3.5 border border-gray-100 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                        >
                            {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1 italic">Verify New Key</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                        </div>
                        <input
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="block w-full pl-11 pr-12 py-3.5 border border-gray-100 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                        >
                            {showConfirmPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-purple-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-purple-100 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] uppercase text-xs tracking-[0.2em]"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                            Finalize Credentials
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default ResetPassword;