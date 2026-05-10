import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Search, AlertCircle, Trash2, Plus, Loader2, Wand2, ShieldAlert } from 'lucide-react';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const PrescriptionManagement = () => {
    const [image, setImage] = useState(null);
    const [ocrLoading, setOcrLoading] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [interactionWarnings, setInteractionWarnings] = useState([]);
    const [patientId, setPatientId] = useState('');
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const { data } = await axios.get('http://localhost:5000/api/patients');
            setPatients(data);
        };
        fetchPatients();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            performOCR(file);
        }
    };

    const performOCR = (file) => {
        setOcrLoading(true);
        Tesseract.recognize(file, 'eng', { logger: m => console.log(m) })
            .then(({ data: { text } }) => {
                const detected = extractMedicines(text);
                setMedicines([...medicines, ...detected]);
                toast.success('Text extracted successfully!');
            })
            .catch(err => toast.error('OCR failed'))
            .finally(() => setOcrLoading(false));
    };

    const extractMedicines = (text) => {
        // Simple regex/keyword logic for demo
        // In real app, use a medical NER model
        const lines = text.split('\n');
        return lines
            .filter(line => line.length > 3 && !line.includes('Dr.') && !line.includes('Date'))
            .map(line => ({ name: line.trim(), dosage: '1 tablet', frequency: '1-0-1', timing: 'After Food' }));
    };

    const addMedicine = () => {
        setMedicines([...medicines, { name: '', dosage: '', frequency: '', timing: 'After Food' }]);
    };

    const removeMedicine = (index) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const updateMedicine = (index, field, value) => {
        const newMeds = [...medicines];
        newMeds[index][field] = value;
        setMedicines(newMeds);
        if (field === 'name') checkInteractions(value);
    };

    const checkInteractions = async (medName) => {
        // Mock OpenFDA check for common interactions
        // In real app, query OpenFDA API
        if (medicines.some(m => m.name.toLowerCase().includes('aspirin')) && medName.toLowerCase().includes('warfarin')) {
            setInteractionWarnings([...interactionWarnings, 'Potential interaction between Aspirin and Warfarin detected. Risk of bleeding.']);
        }
    };

    const handleSave = async () => {
        if (!patientId) return toast.error('Please select a patient');
        try {
            await axios.post('http://localhost:5000/api/prescriptions', {
                patientId,
                medicines,
                notes: 'Generated via AI OCR'
            });
            toast.success('Prescription saved successfully!');
            setMedicines([]);
        } catch (error) {
            toast.error('Failed to save prescription');
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Prescription AI Management</h1>
                <p className="text-slate-500">Upload handwritten or digital prescriptions to auto-generate schedules.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Upload & Preview */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-slate-200 hover:border-medical-primary transition-all group">
                        <label className="cursor-pointer flex flex-col items-center justify-center space-y-4 py-8">
                            <div className="w-16 h-16 bg-medical-primary/10 text-medical-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileUp size={32} />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-slate-900 text-sm">Upload Prescription Image</p>
                                <p className="text-xs text-slate-400 mt-1">PNG, JPG or PDF up to 10MB</p>
                            </div>
                            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                        </label>
                    </div>

                    {image && (
                        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <img src={image} alt="Preview" className="w-full h-auto rounded-2xl grayscale" />
                            {ocrLoading && (
                                <div className="mt-4 flex items-center justify-center gap-2 text-medical-primary font-bold text-sm">
                                    <Loader2 size={16} className="animate-spin" /> Analyzing Image...
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Form & List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-slate-900">Medication Details</h3>
                            <div className="flex gap-2">
                                <button onClick={addMedicine} className="p-2 text-medical-primary hover:bg-medical-primary/5 rounded-xl transition-all border border-medical-primary/20">
                                    <Plus size={20} />
                                </button>
                                <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all border border-purple-200 flex items-center gap-2 text-xs font-bold">
                                    <Wand2 size={16} /> Auto-Fill
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Select Patient</label>
                            <select 
                                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 mt-2 outline-none focus:ring-1 focus:ring-medical-primary"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                            >
                                <option value="">Select a patient...</option>
                                {patients.map(p => (
                                    <option key={p._id} value={p.user?._id}>{p.user?.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {medicines.map((med, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="grid grid-cols-12 gap-3 items-end p-4 bg-slate-50 rounded-2xl border border-slate-100"
                                    >
                                        <div className="col-span-4 space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Medicine Name</label>
                                            <input 
                                                className="w-full bg-white border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-medical-primary outline-none"
                                                value={med.name}
                                                onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-3 space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Dosage</label>
                                            <input 
                                                className="w-full bg-white border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-medical-primary outline-none"
                                                value={med.dosage}
                                                placeholder="e.g. 500mg"
                                                onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-4 space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase">Frequency</label>
                                            <input 
                                                className="w-full bg-white border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-medical-primary outline-none"
                                                value={med.frequency}
                                                placeholder="1-0-1"
                                                onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <button onClick={() => removeMedicine(index)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {interactionWarnings.length > 0 && (
                            <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3">
                                <ShieldAlert className="text-red-500 flex-shrink-0" size={20} />
                                <div>
                                    <h4 className="text-sm font-bold text-red-900">Drug Interaction Warning</h4>
                                    {interactionWarnings.map((w, i) => (
                                        <p key={i} className="text-xs text-red-700 mt-1">{w}</p>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={handleSave}
                            disabled={medicines.length === 0}
                            className="btn-primary w-full py-4 mt-8 disabled:opacity-50"
                        >
                            Save Prescription & Notify Patient
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionManagement;
