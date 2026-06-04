import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';

const AdminLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar Component */}
            <Sidebar isCollapsed={isCollapsed} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Topbar Component */}
                <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;