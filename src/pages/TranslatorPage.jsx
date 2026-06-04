import React, { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, Copy, ArrowRightLeft, Languages, Send, Loader2, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/pages/dashboard/Sidebar';
import { translateText, fetchHistory } from '../redux/reducer/TranslatorSlice';
import { logout } from '../redux/reducer/AuthSlice';
import { toast } from 'react-toastify';

const TranslatorPage = () => {
    // 1. States
    const [inputText, setInputText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('ur');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 2. Redux Data
    const { user } = useSelector((state) => state.auth);
    const { history, loading, currentResult } = useSelector((state) => state.translator);

    // 3. Effects
    useEffect(() => {
        dispatch(fetchHistory()); // Load user's translation history

        // Close dropdown on click outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dispatch]);

    // 4. Handlers
    const handleTranslate = async () => {
        if (!inputText.trim()) return toast.warning("Please enter some text");

        await dispatch(translateText({
            text: inputText,
            sourceLang,
            targetLang
        }));
    };

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate('/'); // Login page par wapis
    };

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.info("Copied to clipboard");
    };

    const speakText = (text, lang) => {
        if (!text) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        window.speechSynthesis.speak(utterance);
    };

    const swapLanguages = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Real History from Redux */}
            <Sidebar history={history} />

            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* --- TOP NAVBAR --- */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100">
                            <Languages className="text-white w-6 h-6" />
                        </div>
                        <span className="font-black text-gray-900 text-2xl tracking-tighter italic uppercase">
                            Lingua<span className="text-indigo-600">Flow</span>
                        </span>
                    </div>

                    {/* Profile & Logout Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 p-1.5 pr-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-md uppercase italic border-2 border-white">
                                {user?.email?.substring(0, 2)}
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Active User</p>
                                <p className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{user?.email}</p>
                            </div>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-3 border-b border-gray-50 mb-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase italic">Logged in as</p>
                                    <p className="text-xs font-bold text-indigo-600 truncate">{user?.email}</p>
                                </div>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                                    <User size={18} /> My Profile
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                                    <Settings size={18} /> Settings
                                </button>
                                <div className="h-[1px] bg-gray-50 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black uppercase text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                    <LogOut size={18} /> Log Out System
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* --- MAIN TRANSLATION CONTENT --- */}
                <main className="p-6 md:p-12 flex flex-col items-center">
                    <div className="max-w-5xl w-full space-y-8">

                        {/* Language Selectors */}
                        <div className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                            <select
                                value={sourceLang}
                                onChange={(e) => setSourceLang(e.target.value)}
                                className="bg-slate-50 font-black text-[11px] uppercase tracking-widest text-gray-600 outline-none cursor-pointer p-3 px-6 rounded-2xl appearance-none hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                            >
                                <option value="en">English</option>
                                <option value="ur">Urdu</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="ar">Arabic</option>
                            </select>

                            <button
                                onClick={swapLanguages}
                                className="p-4 bg-indigo-600 text-white rounded-2xl hover:rotate-180 transition-all duration-500 shadow-lg shadow-indigo-200"
                            >
                                <ArrowRightLeft size={20} />
                            </button>

                            <select
                                value={targetLang}
                                onChange={(e) => setTargetLang(e.target.value)}
                                className="bg-slate-50 font-black text-[11px] uppercase tracking-widest text-gray-600 outline-none cursor-pointer p-3 px-6 rounded-2xl appearance-none hover:bg-indigo-50 hover:text-indigo-600 transition-all text-right"
                            >
                                <option value="ur">Urdu</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="es">Spanish</option>
                                <option value="ar">Arabic</option>
                            </select>
                        </div>

                        {/* Translation Interface */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Input Box */}
                            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 flex flex-col h-[400px] transition-all focus-within:ring-4 ring-indigo-50">
                                <textarea
                                    className="flex-1 w-full resize-none outline-none text-2xl font-bold text-gray-800 placeholder:text-gray-200 italic"
                                    placeholder="Type protocol to translate..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />
                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => speakText(inputText, sourceLang)}
                                            className="p-3 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-2xl transition-all"
                                        >
                                            <Volume2 size={22} />
                                        </button>
                                        <button className="p-3 bg-slate-50 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-2xl transition-all">
                                            <Mic size={22} />
                                        </button>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{inputText.length} / 5000</span>
                                </div>
                            </div>

                            {/* Output Box */}
                            <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 flex flex-col h-[400px] text-white relative overflow-hidden">
                                <div className="flex-1 text-2xl font-bold italic overflow-y-auto z-10 leading-relaxed">
                                    {loading ? (
                                        <div className="flex items-center gap-3 opacity-40">
                                            <Loader2 className="animate-spin" />
                                            <span>Processing Data...</span>
                                        </div>
                                    ) : (
                                        currentResult?.translatedText || <span className="opacity-10">Output stream waiting...</span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5 z-10">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => speakText(currentResult?.translatedText, targetLang)}
                                            className="p-3 bg-white/5 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-2xl transition-all"
                                        >
                                            <Volume2 size={22} />
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(currentResult?.translatedText)}
                                            className="p-3 bg-white/5 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-2xl transition-all"
                                        >
                                            <Copy size={22} />
                                        </button>
                                    </div>
                                    <button
                                        disabled={loading}
                                        onClick={handleTranslate}
                                        className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-indigo-600 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Send size={16} /> Execute</>}
                                    </button>
                                </div>

                                {/* Background Decor */}
                                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-600/10 rounded-full blur-[60px]"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TranslatorPage;