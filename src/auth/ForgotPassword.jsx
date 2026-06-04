import React, { useState } from 'react';
import { Mail, ArrowLeft, KeyRound, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, resetAuth } from '../redux/reducer/AuthSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state se loading nikalna
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return toast.error("Please enter your registered email");
        }

        // Backend call for OTP
        const result = await dispatch(forgotPassword(email));

        if (result.meta.requestStatus === 'fulfilled') {
            toast.success("Security OTP sent to your email!");
            // Reset page par bhej rahe hain aur email state mein pass kar rahe hain
            navigate('/reset-password', { state: { email } });
        } else {
            toast.error(result.payload?.msg || "User not found or system error");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-center"
        >
            {/* Icon Header */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-[2.5rem] mb-6 shadow-inner">
                <KeyRound className="w-10 h-10 text-indigo-600" />
            </div>

            <h3 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tight uppercase">
                Recover <span className="text-indigo-600">Access</span>
            </h3>
            <p className="text-slate-500 mb-8 px-4 font-medium text-sm">
                Enter your registered email registry to request a security reset token.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="text-left">
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 italic">
                        Email Registry
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        </div>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="block w-full pl-11 pr-4 py-3.5 border border-gray-100 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                        />
                    </div>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] uppercase text-xs tracking-[0.2em]"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Request Reset Token
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-10 pt-6 border-t border-slate-50">
                <Link
                    to="/login"
                    onClick={() => dispatch(resetAuth())}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft size={16} /> Terminate & Return to Login
                </Link>
            </div>
        </motion.div>
    );
};

export default ForgotPassword;