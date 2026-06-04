import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuth } from '../redux/reducer/AuthSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(formData));

        if (result.meta.requestStatus === 'fulfilled') {
            toast.success(`Welcome ${result.payload.user.email}!`);
        } else {
            toast.error(result.payload?.msg || "Login Failed");
        }
    };

    return (
        <div>
            <div className="mb-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tight uppercase">Access <span className="text-indigo-600">Portal</span></h3>
                <p className="text-gray-500 font-medium">Welcome back! Establish a secure connection.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Email Key</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-1.5 ml-1">
                        <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Security Key</label>
                        <Link to="/forgot-password" size={16} className="text-[10px] font-black text-indigo-600 uppercase hover:underline">Lost Key?</Link>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-indigo-600 transition-colors">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 group transition-all active:scale-[0.98] uppercase text-xs tracking-[0.2em]"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                            Establish Connection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <p className="mt-10 text-center text-gray-600 font-medium text-sm italic">
                New Explorer? <Link to="/register" className="text-indigo-600 font-black hover:underline ml-1">Create an account</Link>
            </p>
        </div>
    );
};

export default Login;