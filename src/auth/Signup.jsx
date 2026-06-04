import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/reducer/AuthSlice';
import { toast } from 'react-toastify';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        const result = await dispatch(registerUser({
            name: formData.name,
            email: formData.email,
            password: formData.password
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            toast.success("OTP sent to your email!");
            // OTP page par bhej rahe hain aur email pass kar rahe hain state mein
            navigate('/verify-otp', { state: { email: formData.email } });
        } else {
            toast.error(result.payload?.msg || "Registration Failed");
        }
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tight">Create <span className="text-indigo-600">Account</span></h3>
                <p className="text-gray-500 font-medium">Join our community of polyglots today.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-3 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-3 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="block w-full pl-11 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Confirm</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="block w-full pl-11 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold"
                            />
                        </div>
                    </div>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] mt-4"
                >
                    {loading ? <Loader2 className="animate-spin" /> : (
                        <>
                            Initialize Registry
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <p className="mt-6 text-center text-gray-600 font-medium text-sm">
                Already registered?
                <Link to="/login" className="ml-1 text-indigo-600 font-bold hover:underline">Sign In</Link>
            </p>
        </div>
    );
};

export default Register;