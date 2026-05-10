import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Users, FileText, Bell, Settings, LogOut, Activity } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: user?.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard' },
        { name: 'Prescriptions', icon: <ReceiptText size={20} />, path: '/prescriptions' },
        { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-medical-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Activity size={24} />
                </div>
                <h1 className="text-xl font-bold gradient-text">MediTrack AI</h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                isActive 
                                ? 'bg-medical-primary/10 text-medical-primary font-semibold' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button 
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
