import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Languages, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducer/AuthSlice';
import { toast } from 'react-toastify';

const Sidebar = ({ isCollapsed }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.info("Admin Session Terminated Safely");
        navigate('/');
    };

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    ];

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 85 : 280 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="h-screen bg-[#05070a] text-white flex flex-col sticky top-0 overflow-hidden z-50 shrink-0 border-r border-white/5 shadow-2xl"
        >
            {/* Logo */}
            <div className="p-6 flex items-center gap-3 border-b border-white/5 h-20">
                <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20 rotate-3">
                    <Languages size={24} className="text-white" />
                </div>
                {!isCollapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black italic tracking-tighter uppercase">
                        Lingua<span className="text-indigo-500">Admin</span>
                    </motion.span>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-2 mt-6">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all group relative ${location.pathname === item.path
                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20'
                            : 'text-slate-500 hover:bg-white/5 hover:text-indigo-400'
                            }`}
                    >
                        <div className="shrink-0 transition-transform group-hover:scale-110">{item.icon}</div>
                        {!isCollapsed && (
                            <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-20 bg-slate-800 text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all border border-white/10 z-50 shadow-2xl">
                                {item.name}
                            </div>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Logout Footer */}
            <div className="p-4 border-t border-white/5 mb-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 p-4 text-red-500 hover:bg-red-500/10 w-full rounded-2xl transition-all group"
                >
                    <LogOut size={20} className="shrink-0 group-hover:rotate-12 transition-transform" />
                    {!isCollapsed && <span className="text-xs font-black uppercase tracking-widest italic">Terminate Root</span>}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;