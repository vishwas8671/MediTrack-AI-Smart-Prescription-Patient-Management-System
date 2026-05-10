const Prescription = require('../models/Prescription');

exports.getPrescriptions = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'doctor') {
            query = { doctor: req.user._id };
        } else {
            query = { patient: req.user._id };
        }
        const prescriptions = await Prescription.find(query)
            .populate('doctor', 'name email')
            .populate('patient', 'name email');
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPrescription = async (req, res) => {
    try {
        const { patientId, medicines, notes } = req.body;
        const prescription = await Prescription.create({
            doctor: req.user._id,
            patient: patientId,
            medicines,
            notes
        });
        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id)
            .populate('doctor', 'name email')
            .populate('patient', 'name email');
        if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
        res.json(prescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
