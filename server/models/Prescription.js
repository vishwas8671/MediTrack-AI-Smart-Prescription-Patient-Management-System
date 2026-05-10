const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true }, // e.g., "1-0-1" or "Twice daily"
    timing: { type: String, enum: ['Before Food', 'After Food', 'Empty Stomach'] },
    duration: { type: String }, // e.g., "5 days"
});

const prescriptionSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the patient's User account
    medicines: [medicineSchema],
    notes: { type: String },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
