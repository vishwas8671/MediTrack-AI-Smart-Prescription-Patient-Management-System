import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertTriangle, Calendar, FileText, Activity } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PatientDashboard = () => {
    const { user } = useContext(AuthContext);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/prescriptions');
                setPrescriptions(data);
            } catch (error) {
                toast.error('Failed to fetch medical data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const medicines = prescriptions.flatMap(p => p.medicines);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Good Morning, {user?.name}</h1>
                    <p className="text-slate-500">Stay healthy. Here's your schedule for today.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                    <Calendar className="text-medical-primary" size={20} />
                    <span className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Schedule */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Clock size={20} className="text-medical-primary" /> Today's Medicine
                            </h3>
                            <span className="text-xs font-bold text-medical-primary bg-medical-primary/5 px-3 py-1 rounded-full uppercase">
                                {medicines.length} Medicines
                            </span>
                        </div>

                        <div className="space-y-4">
                            {medicines.length > 0 ? medicines.map((med, i) => (
                                <MedicineItem key={i} med={med} />
                            )) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 size={32} className="text-slate-200" />
                                    </div>
                                    <p className="text-slate-400">No medicines scheduled for today.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <ActionCard 
                            title="Upload Reports" 
                            desc="Add your latest lab results" 
                            icon={<FileText />} 
                            color="blue"
                        />
                        <ActionCard 
                            title="Health Progress" 
                            desc="Check your recovery stats" 
                            icon={<Activity />} 
                            color="teal"
                        />
                    </div>
                </div>

                {/* Right Column: Alerts & Tips */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-medical-primary to-medical-secondary p-8 rounded-3xl text-white shadow-lg shadow-medical-primary/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">Health Tip</h3>
                            <p className="text-white/80 text-sm leading-relaxed mb-6">
                                "Staying hydrated is key to your recovery. Aim for at least 3 liters of water today."
                            </p>
                            <button className="bg-white text-medical-primary px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform">
                                Read More
                            </button>
                        </div>
                        <Activity size={120} className="absolute -bottom-10 -right-10 text-white/10" />
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Reports</h3>
                        <div className="space-y-4 text-center py-8">
                            <FileText size={48} className="text-slate-100 mx-auto mb-3" />
                            <p className="text-slate-400 text-sm">No reports uploaded yet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MedicineItem = ({ med }) => (
    <div className="flex items-center gap-4 p-5 bg-slate-50 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 rounded-2xl transition-all group">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-medical-primary shadow-sm group-hover:scale-110 transition-transform">
            <Activity size={24} />
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-900">{med.name}</h4>
            <p className="text-xs text-slate-500 mt-1">{med.dosage} • {med.timing}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">{med.frequency}</span>
            <button className="p-1.5 text-slate-300 hover:text-green-500 transition-colors">
                <CheckCircle2 size={24} />
            </button>
        </div>
    </div>
);

const ActionCard = ({ title, desc, icon, color }) => {
    const colors = {
        blue: 'text-blue-600 bg-blue-50',
        teal: 'text-teal-600 bg-teal-50'
    };
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className={`w-12 h-12 ${colors[color]} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 mt-1">{desc}</p>
        </div>
    );
};

export default PatientDashboard;
