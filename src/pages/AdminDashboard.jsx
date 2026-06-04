import React, { useEffect } from 'react';
import { Users, Globe2, TrendingUp, MoreVertical, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminStats } from '../redux/reducer/AdminSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { stats, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAdminStats());
    }, [dispatch]);

    // Chart Data (Mocking growth based on total translations for visual)
    const chartData = [
        { name: 'Total', value: stats?.totalTranslations || 0 },
        { name: 'Users', value: stats?.totalUsers || 0 },
    ];

    if (loading) return (
        <div className="h-96 flex flex-col items-center justify-center text-indigo-600 font-bold uppercase tracking-widest italic">
            <Loader2 className="animate-spin mb-4" size={40} />
            Synchronizing Terminal...
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard
                    icon={<Users size={24} className="text-blue-600" />}
                    title="System Users"
                    value={stats?.totalUsers || 0}
                    grow="+12%"
                    bg="bg-blue-50"
                />
                <StatCard
                    icon={<Globe2 size={24} className="text-indigo-600" />}
                    title="Total Translations"
                    value={stats?.totalTranslations || 0}
                    grow="+18%"
                    bg="bg-indigo-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-black text-slate-900 uppercase italic tracking-tight">Platform <span className="text-indigo-600">Analytics</span></h3>
                        <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-400 italic">Real-time Stream</div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* System Activity */}
                <div className="lg:col-span-4 bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
                    <h3 className="font-black italic uppercase tracking-tighter mb-8 z-10 relative text-xl">Recent <span className="text-indigo-400">Activity</span></h3>
                    <div className="space-y-6 z-10 relative">
                        {[1, 2, 3, 4].map((u) => (
                            <div key={u} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center font-black text-indigo-400 italic border border-indigo-500/20">
                                        0{u}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white uppercase italic">User Protocol Registry</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">ID: 402{u} • Active</p>
                                    </div>
                                </div>
                                <MoreVertical size={16} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                            </div>
                        ))}
                    </div>
                    {/* Background Glow */}
                    <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-indigo-600/10 rounded-full blur-[40px]"></div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, grow, bg }) => (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group">
        <div className="flex items-center justify-between mb-6">
            <div className={`p-4 rounded-2xl ${bg} group-hover:scale-110 transition-transform shadow-inner`}>
                {icon}
            </div>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-xl uppercase tracking-widest">{grow}</span>
        </div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic">{title}</p>
        <h4 className="text-3xl font-black text-slate-900 mt-2 tracking-tighter">{value}</h4>
    </div>
);

export default AdminDashboard;