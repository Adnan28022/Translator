import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Languages, RotateCcw, AlertCircle } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        // Timer Logic
        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        // Redirect Logic after 5 seconds
        const redirect = setTimeout(() => {
            navigate(-1); // Pichle page par wapis bhej dega
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [navigate]);

    return (
        <div className="h-screen w-full bg-slate-900 flex items-center justify-center p-6 overflow-hidden font-sans relative">

            {/* Decorative Blur Circles */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-[100px]"></div>

            <div className="max-w-md w-full text-center z-10">

                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-6 inline-flex p-5 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl text-indigo-400"
                >
                    <Languages size={48} />
                </motion.div>

                {/* Error Code & Message */}
                <h1 className="text-6xl font-black text-white mb-2 tracking-tighter">404</h1>
                <h2 className="text-xl font-bold text-slate-200 mb-2">Lost in Translation</h2>
                <p className="text-slate-400 text-sm mb-8">
                    The page you're looking for doesn't exist.
                </p>

                {/* Timer UI Card */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-md">
                    <div className="flex items-center justify-center gap-3 text-indigo-400 mb-4">
                        <RotateCcw size={18} className="animate-spin-slow" />
                        <span className="text-sm font-semibold tracking-wide uppercase">Redirecting in {seconds}s</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="h-full bg-indigo-500"
                        />
                    </div>
                </div>

                {/* Manual Go Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mt-8 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                    <AlertCircle size={14} />
                    Don't want to wait? Click here
                </button>
            </div>

            {/* Floating Background Text (Decorative) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
                <h1 className="text-[20vw] font-black uppercase italic leading-none">Not Found</h1>
            </div>
        </div>
    );
};

export default NotFound;