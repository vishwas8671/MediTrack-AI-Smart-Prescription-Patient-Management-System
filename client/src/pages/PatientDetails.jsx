import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, Droplets, ShieldAlert, History, FileText, Plus } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/patients/${id}`);
                setPatient(data);
            } catch (error) {
                toast.error('Failed to load patient details');
            } finally {
                setLoading(false);
            }
        };
        fetchPatient();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading Profile...</div>;
    if (!patient) return <div className="p-8 text-center text-red-500">Patient not found</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row items-start gap-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-32 h-32 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
                    <img src={`https://ui-avatars.com/api/?name=${patient.user?.name}&size=128&background=random`} alt="" />
                </div>
                <div className="flex-1 space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{patient.user?.name}</h1>
                        <p className="text-slate-500">{patient.user?.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Badge icon={<User size={14}/>} label={`${patient.age || 'N/A'} Years`} />
                        <Badge icon={<Droplets size={14} className="text-red-500"/>} label={patient.bloodGroup || 'O+'} color="bg-red-50 text-red-700" />
                        <Badge icon={<Phone size={14}/>} label={patient.emergencyContact?.phone || 'No Contact'} />
                    </div>
                </div>
                <button className="btn-primary">Edit Profile</button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-8 lg:col-span-1">
                    <InfoCard title="Medical Background" icon={<History />}>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Known Allergies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies?.map(a => <span key={a} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg">{a}</span>)}
                                    {(!patient.allergies || patient.allergies.length === 0) && <p className="text-sm text-slate-400">No known allergies</p>}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Disease History</h4>
                                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                                    {patient.medicalHistory?.map(h => <li key={h}>{h}</li>)}
                                    {(!patient.medicalHistory || patient.medicalHistory.length === 0) && <p className="text-sm text-slate-400">None recorded</p>}
                                </ul>
                            </div>
                        </div>
                    </InfoCard>

                    <InfoCard title="Emergency Contact" icon={<ShieldAlert />}>
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-slate-900">{patient.emergencyContact?.name || 'Not provided'}</p>
                            <p className="text-sm text-slate-500">{patient.emergencyContact?.phone}</p>
                            <p className="text-xs text-slate-400 italic">{patient.emergencyContact?.relation}</p>
                        </div>
                    </InfoCard>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <FileText size={20} className="text-medical-primary" /> Reports & Documents
                            </h3>
                            <button className="text-medical-primary text-sm font-bold flex items-center gap-1 hover:underline">
                                <Plus size={16} /> Upload
                            </button>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <ReportItem title="Blood Analysis" date="May 10, 2026" />
                            <ReportItem title="X-Ray Chest" date="April 22, 2026" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Badge = ({ icon, label, color = "bg-slate-100 text-slate-600" }) => (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium ${color}`}>
        {icon}
        {label}
    </div>
);

const InfoCard = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold border-b border-slate-50 pb-4">
            {React.cloneElement(icon, { size: 20, className: "text-medical-primary" })}
            {title}
        </div>
        {children}
    </div>
);

const ReportItem = ({ title, date }) => (
    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-medical-primary/30 transition-all cursor-pointer group">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-medical-primary shadow-sm">
                    <FileText size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-medical-primary transition-colors">{title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{date}</p>
                </div>
            </div>
        </div>
    </div>
);

export default PatientDetails;
