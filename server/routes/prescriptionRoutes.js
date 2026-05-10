const express = require('express');
const { getPrescriptions, createPrescription, getPrescriptionById } = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.route('/')
    .get(protect, getPrescriptions)
    .post(protect, authorize('doctor'), createPrescription);

router.route('/:id')
    .get(protect, getPrescriptionById);

module.exports = router;
