import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Shield, Cpu, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 overflow-x-hidden">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-white/20 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Activity className="text-medical-primary" size={28} />
                    <span className="text-xl font-bold gradient-text">MediTrack AI</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-slate-600 font-medium hover:text-medical-primary transition-colors">Login</Link>
                    <Link to="/signup" className="btn-primary">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-4 rounded-full bg-medical-primary/10 text-medical-primary text-sm font-semibold mb-6">
                            Next-Gen Healthcare Management
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                            Smart Healthcare <br />
                            <span className="gradient-text">Powered by AI</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-8 max-w-lg">
                            Streamline patient records, automate prescriptions with OCR, and ensure medication safety with our intelligent management system.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/signup" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                                Start Your Trial <ArrowRight size={20} />
                            </Link>
                            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all shadow-sm">
                                View Demo
                            </button>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-medical-primary to-medical-secondary opacity-20 blur-3xl rounded-full"></div>
                        <div className="relative glass-card rounded-3xl p-4 shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                                alt="Medical UI" 
                                className="rounded-2xl shadow-lg w-full h-auto"
                            />
                            {/* Floating UI elements */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100"
                            >
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg"><CheckCircle2 size={20}/></div>
                                <div>
                                    <p className="text-xs text-slate-400">Diagnosis Status</p>
                                    <p className="text-sm font-bold">Confirmed</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything You Need to Scale Your Clinic</h2>
                        <p className="text-slate-600">Built for doctors who value efficiency and patient care.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Cpu />} 
                            title="AI OCR Prescription" 
                            desc="Automatically extract medication details from handwritten prescriptions using advanced OCR."
                        />
                        <FeatureCard 
                            icon={<Shield />} 
                            title="Drug Interaction Alerts" 
                            desc="Safety first. Get instant warnings about harmful medicine combinations via OpenFDA."
                        />
                        <FeatureCard 
                            icon={<Clock />} 
                            title="Medicine Scheduler" 
                            desc="Automated reminders and adherence tracking for better treatment outcomes."
                        />
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="py-12 bg-slate-900 text-white px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Activity className="text-medical-primary" size={28} />
                        <span className="text-xl font-bold">MediTrack AI</span>
                    </div>
                    <div className="flex gap-8 text-slate-400 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Contact Us</a>
                    </div>
                    <p className="text-slate-500 text-sm">© 2026 MediTrack AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="p-8 rounded-3xl border border-slate-100 hover:border-medical-primary/20 hover:shadow-xl transition-all bg-slate-50"
    >
        <div className="w-14 h-14 bg-medical-primary/10 text-medical-primary rounded-2xl flex items-center justify-center mb-6">
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </motion.div>
);

export default LandingPage;
