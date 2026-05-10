import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ReceiptText, AlertCircle, TrendingUp, Plus, Search, Filter, MoreVertical } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const DoctorDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/patients`);
                setPatients(data);
            } catch (error) {
                toast.error('Failed to fetch patients');
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    const stats = [
        { title: 'Total Patients', value: patients.length, icon: <Users className="text-blue-600" />, bg: 'bg-blue-50' },
        { title: 'Active Prescriptions', value: '12', icon: <ReceiptText className="text-teal-600" />, bg: 'bg-teal-50' },
        { title: 'Critical Alerts', value: '3', icon: <AlertCircle className="text-red-600" />, bg: 'bg-red-50' },
        { title: 'Consultations', value: '24', icon: <TrendingUp className="text-purple-600" />, bg: 'bg-purple-50' },
    ];

    const chartData = [
        { name: 'Mon', count: 4 },
        { name: 'Tue', count: 7 },
        { name: 'Wed', count: 5 },
        { name: 'Thu', count: 12 },
        { name: 'Fri', count: 9 },
        { name: 'Sat', count: 15 },
        { name: 'Sun', count: 10 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Doctor Dashboard</h1>
                    <p className="text-slate-500">Welcome back, Dr. Smith. Here's what's happening today.</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> Add New Patient
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                    >
                        <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                            {stat.icon}
                        </div>
                        <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Charts & Activity */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-slate-900">Patient Inflow</h3>
                        <select className="bg-slate-50 border-none rounded-lg text-sm px-3 py-1 outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Alerts</h3>
                    <div className="space-y-4">
                        <AlertItem 
                            type="critical" 
                            title="Medicine Missed" 
                            desc="John Doe missed Morning dosage" 
                            time="2h ago" 
                        />
                        <AlertItem 
                            type="warning" 
                            title="High Blood Pressure" 
                            desc="Sarah Parker recorded 150/95" 
                            time="4h ago" 
                        />
                        <AlertItem 
                            type="info" 
                            title="Report Uploaded" 
                            desc="New Lab Report for Mike Ross" 
                            time="Yesterday" 
                        />
                    </div>
                </div>
            </div>

            {/* Patients Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-slate-900">Recent Patients</h3>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-slate-50 border-none rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-1 focus:ring-medical-primary transition-all outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="p-2 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Group</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {patients.filter(p => p.user?.name.toLowerCase().includes(searchTerm.toLowerCase())).map((patient) => (
                                <tr key={patient._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                                <img src={`https://ui-avatars.com/api/?name=${patient.user?.name}&background=random`} alt="" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{patient.user?.name}</p>
                                                <p className="text-xs text-slate-500">{patient.user?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">#{patient._id.slice(-6)}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">
                                            {patient.bloodGroup || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && patients.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                        No patients found. Add your first patient to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const AlertItem = ({ type, title, desc, time }) => {
    const colors = {
        critical: 'bg-red-500',
        warning: 'bg-amber-500',
        info: 'bg-blue-500'
    };
    return (
        <div className="flex gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors">
            <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${colors[type]}`}></div>
            <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{time}</span>
        </div>
    );
};

export default DoctorDashboard;
