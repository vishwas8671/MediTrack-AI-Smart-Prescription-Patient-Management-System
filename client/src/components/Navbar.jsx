import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Search, Bell, UserCircle } from 'lucide-react';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
            <div className="flex-1 max-w-md hidden md:block">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-primary transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search patients, reports, records..." 
                        className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-medical-primary/20 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="h-8 w-px bg-slate-200 mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                    </div>
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-medical-primary overflow-hidden border border-slate-200">
                        {user?.profileImage ? (
                            <img src={user.profileImage} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                            <UserCircle size={24} />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
