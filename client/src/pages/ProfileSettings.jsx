import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Shield, Bell, Globe, Camera } from 'lucide-react';

const ProfileSettings = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
                <p className="text-slate-500">Update your personal information and preferences.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                    <nav className="flex flex-col gap-1">
                        <SettingsLink icon={<User size={18}/>} label="Personal Info" active />
                        <SettingsLink icon={<Shield size={18}/>} label="Security" />
                        <SettingsLink icon={<Bell size={18}/>} label="Notifications" />
                        <SettingsLink icon={<Globe size={18}/>} label="Language" />
                    </nav>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-50">
                            <div className="relative">
                                <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-medical-primary border border-slate-200 overflow-hidden">
                                    <img src={`https://ui-avatars.com/api/?name=${user?.name}&size=128&background=random`} alt="" />
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-medical-primary transition-colors">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
                                <p className="text-sm text-slate-500 capitalize">{user?.role} Account</p>
                            </div>
                        </div>

                        <form className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        defaultValue={user?.name}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:ring-1 focus:ring-medical-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        defaultValue={user?.email}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:ring-1 focus:ring-medical-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-4">
                                <button type="button" className="px-6 py-2 text-slate-500 font-semibold hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
                                <button type="submit" className="btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SettingsLink = ({ icon, label, active }) => (
    <button className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active ? 'bg-medical-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}>
        {icon}
        {label}
    </button>
);

export default ProfileSettings;
