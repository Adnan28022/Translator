import React from 'react';
import { Clock, Trash2, MessageSquare, ArrowRight, Languages } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteHistoryItem } from '../../../redux/reducer/TranslatorSlice';
import { toast } from 'react-toastify';

const Sidebar = ({ history }) => {
    const dispatch = useDispatch();

    const handleDelete = (e, id) => {
        e.stopPropagation(); // Card click event ko rokne ke liye
        if (window.confirm("Delete this translation record?")) {
            dispatch(deleteHistoryItem(id))
                .then(() => toast.info("Record removed from terminal"));
        }
    };

    return (
        <div className="w-80 h-full bg-white border-r border-gray-100 flex flex-col hidden lg:flex shrink-0">
            {/* --- HEADER --- */}
            <div className="p-6 border-b border-gray-50 bg-slate-50/50">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <Clock size={18} className="animate-pulse" />
                    <h2 className="font-black text-sm text-slate-800 uppercase tracking-widest italic">Intelligence <span className="text-indigo-600">Logs</span></h2>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Stored Data Packets</p>
            </div>

            {/* --- HISTORY LIST --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {history && history.length > 0 ? (
                    history.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="p-4 rounded-[1.5rem] bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/40 transition-all cursor-pointer group relative overflow-hidden"
                        >
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 p-1 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                <Languages size={40} />
                            </div>

                            <div className="flex justify-between items-start mb-3 relative z-10">
                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-tighter italic border border-indigo-100">
                                    {item.fromLang?.toUpperCase()} <ArrowRight size={8} className="inline mx-0.5" /> {item.toLang?.toUpperCase()}
                                </span>
                                <button
                                    onClick={(e) => handleDelete(e, item._id)}
                                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            {/* Original Text Snippet */}
                            <p className="text-xs font-bold text-slate-700 line-clamp-1 mb-1 italic">
                                "{item.originalText}"
                            </p>

                            {/* Translated Text Snippet */}
                            <p className="text-[11px] font-medium text-slate-400 line-clamp-2 leading-relaxed">
                                {item.translatedText}
                            </p>

                            <div className="mt-3 flex justify-between items-center">
                                <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                                <div className="w-1 h-1 rounded-full bg-indigo-200 group-hover:w-4 transition-all duration-500"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6">
                        <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-4 border border-slate-100">
                            <MessageSquare size={24} className="text-slate-200" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                            No data packets <br /> detected in registry
                        </p>
                    </div>
                )}
            </div>

            {/* --- FOOTER --- */}
            <div className="p-4 border-t border-gray-50 bg-slate-50/30">
                <div className="p-3 rounded-2xl bg-indigo-600 text-white flex items-center justify-between shadow-lg shadow-indigo-100">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-tighter italic leading-none">Total Logs</span>
                        <span className="text-lg font-black leading-none mt-1">{history.length}</span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <Languages size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;