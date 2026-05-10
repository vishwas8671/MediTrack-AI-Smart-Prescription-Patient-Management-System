const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    bloodGroup: { type: String },
    allergies: [String],
    medicalHistory: [String],
    emergencyContact: {
        name: { type: String },
        phone: { type: String },
        relation: { type: String }
    },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Assigned doctor
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
