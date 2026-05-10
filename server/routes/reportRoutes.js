const express = require('express');
const { uploadReport, getReports } = require('../controllers/reportController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/', protect, upload.single('report'), uploadReport);
router.get('/', protect, getReports);

module.exports = router;
