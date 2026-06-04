import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, RefreshCw, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, resetAuth } from '../redux/reducer/AuthSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const VerifyOTP = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Register page se email nikalna
    const email = location.state?.email || "your email";

    const { loading, success, error } = useSelector((state) => state.auth);

    // OTP Input logic (Auto-focus to next box)
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (index === idx ? element.value : d))]);

        // Focus next input
        if (element.value !== "" && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalOtp = otp.join("");

        if (finalOtp.length < 6) {
            return toast.error("Please enter complete 6-digit code");
        }

        const result = await dispatch(verifyOTP({ email, otp: finalOtp }));

        if (result.meta.requestStatus === 'fulfilled') {
            toast.success("Identity Verified! Please Login.");
            dispatch(resetAuth());
            navigate('/');
        } else {
            toast.error(result.payload?.msg || "Verification Failed");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center"
        >
            {/* Success Icon Header */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-[2rem] mb-6 shadow-inner">
                <ShieldCheck className="w-10 h-10 text-emerald-600" />
            </div>

            <h3 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tight uppercase">
                Verify <span className="text-indigo-600">Identity</span>
            </h3>
            <p className="text-slate-500 mb-8 px-4 font-medium text-sm">
                We've sent a 6-digit verification key to <br />
                <span className="font-bold text-slate-900 lowercase">{email}</span>
            </p>

            <form className="space-y-8" onSubmit={handleSubmit}>
                {/* OTP Inputs Grid */}
                <div className="flex justify-center gap-2 sm:gap-3">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black border-2 border-slate-100 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 focus:outline-none transition-all bg-slate-50 focus:bg-white text-slate-800"
                        />
                    ))}
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-[0.98] uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3"
                >
                    {loading ? <Loader2 className="animate-spin" /> : "Authorize Terminal"}
                </button>
            </form>

            <div className="mt-8 space-y-6">
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest leading-none">
                    Didn't receive the key?
                    <button className="ml-2 text-indigo-600 font-black inline-flex items-center gap-1 hover:underline">
                        <RefreshCw className="w-3 h-3" /> Resend Code
                    </button>
                </p>

                <div className="pt-4 border-t border-slate-50">
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                        <ArrowLeft size={16} /> Edit Registration Info
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default VerifyOTP;