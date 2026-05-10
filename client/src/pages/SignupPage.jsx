import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Activity, User, Briefcase, Stethoscope } from 'lucide-react';
import { toast } from 'react-toastify';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient'
    });
    const [loading, setLoading] = useState(false);
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup(formData.name, formData.email, formData.password, formData.role);
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg"
            >
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2">
                        <Activity className="text-medical-primary" size={32} />
                        <span className="text-2xl font-bold gradient-text">MediTrack AI</span>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Create your account</h2>
                    <p className="text-slate-500 text-center mb-8">Join the next generation of healthcare</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'doctor' })}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                                    formData.role === 'doctor' 
                                    ? 'border-medical-primary bg-medical-primary/5 text-medical-primary' 
                                    : 'border-slate-100 text-slate-400 hover:border-slate-200'
                                }`}
                            >
                                <Stethoscope size={24} />
                                <span className="font-semibold">Doctor</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'patient' })}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                                    formData.role === 'patient' 
                                    ? 'border-medical-primary bg-medical-primary/5 text-medical-primary' 
                                    : 'border-slate-100 text-slate-400 hover:border-slate-200'
                                }`}
                            >
                                <User size={24} />
                                <span className="font-semibold">Patient</span>
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none"
                                    placeholder="name@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="password" 
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-primary w-full py-4 text-lg disabled:opacity-50 mt-4"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-500">
                            Already have an account? {' '}
                            <Link to="/login" className="text-medical-primary font-bold hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
