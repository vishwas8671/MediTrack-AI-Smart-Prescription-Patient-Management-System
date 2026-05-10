import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import PrescriptionManagement from './pages/PrescriptionManagement';
import PatientDetails from './pages/PatientDetails';
import ReportsPage from './pages/ReportsPage';
import ProfileSettings from './pages/ProfileSettings';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider, AuthContext } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/prescriptions" element={<PrescriptionManagement />} />
            <Route path="/patient/:id" element={<PatientDetails />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<ProfileSettings />} />
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" theme="colored" />
      </Router>
    </AuthProvider>
  );
}

const DashboardRedirect = () => {
  const { user } = React.useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return user.role === 'doctor' ? <Navigate to="/doctor/dashboard" /> : <Navigate to="/patient/dashboard" />;
};

export default App;
