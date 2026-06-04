import React from 'react';
import { Outlet } from 'react-router-dom';
import { Languages } from 'lucide-react';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

                {/* Left Side: Branding (Common for all auth pages) */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 p-12 text-white flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                                <Languages className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">LinguaFlow</span>
                        </div>
                        <h2 className="text-4xl font-extrabold leading-tight mb-4">
                            Speak Every <br />Language.
                        </h2>
                        <p className="text-indigo-100 text-lg">
                            The world's most advanced AI-powered translation platform.
                        </p>
                    </div>
                    <div className="relative z-10 text-sm opacity-70">
                        © 2024 LinguaFlow AI. All rights reserved.
                    </div>
                </div>

                {/* Right Side: Dynamic Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;