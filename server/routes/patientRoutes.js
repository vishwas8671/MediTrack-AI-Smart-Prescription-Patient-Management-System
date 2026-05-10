const express = require('express');
const { getPatients, getPatientById, createPatient, updatePatient } = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.route('/')
    .get(protect, getPatients)
    .post(protect, authorize('doctor'), createPatient);

router.route('/:id')
    .get(protect, getPatientById)
    .put(protect, updatePatient);

module.exports = router;
