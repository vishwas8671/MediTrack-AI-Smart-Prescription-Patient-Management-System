const Patient = require('../models/Patient');
const User = require('../models/User');

exports.getPatients = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'doctor') {
            // Doctors can see all or maybe only assigned ones? Let's say all for now.
        } else {
            query = { user: req.user._id };
        }
        const patients = await Patient.find(query).populate('user', 'name email profileImage');
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('user', 'name email profileImage');
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        
        // Security: Patient can only see their own profile
        if (req.user.role === 'patient' && patient.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPatient = async (req, res) => {
    try {
        const { age, gender, bloodGroup, allergies, medicalHistory, emergencyContact, userId } = req.body;
        // userId should be provided if doctor is creating for someone else, or use req.user._id
        const targetUserId = userId || req.user._id;
        
        const patient = await Patient.create({
            user: targetUserId,
            age,
            gender,
            bloodGroup,
            allergies,
            medicalHistory,
            emergencyContact,
            doctor: req.user._id
        });
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
