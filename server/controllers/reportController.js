const Report = require('../models/Report');

exports.uploadReport = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        
        const { title, type, patientId } = req.body;
        const report = await Report.create({
            patient: patientId || req.user._id,
            title,
            type,
            fileUrl: `/uploads/${req.file.filename}`
        });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'patient') {
            query = { patient: req.user._id };
        } else if (req.query.patientId) {
            query = { patient: req.query.patientId };
        }
        const reports = await Report.find(query).populate('patient', 'name email');
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
