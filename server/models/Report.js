const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    type: { type: String }, // e.g., "Blood Test", "X-Ray"
    uploadDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
