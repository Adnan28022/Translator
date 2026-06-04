import React from 'react';
import { Menu, X, Search, User } from 'lucide-react';

const Topbar = ({ isCollapsed, setIsCollapsed }) => {
    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 sticky top-0 z-40">
            {/* Left side: Toggle & Search */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95 shadow-sm"
                >
                    {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                </button>

                <div className="relative hidden sm:block group">
                    <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm outline-none w-64 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                </div>
            </div>

            {/* Right side: User Profile */}
            <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-gray-900 leading-none">John Admin</p>
                    <p className="text-[10px] text-gray-400 font-semibold mt-1 uppercase tracking-wider">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg border-2 border-white cursor-pointer hover:rotate-6 transition-transform">
                    <User size={20} />
                </div>
            </div>
        </header>
    );
};

export default Topbar;