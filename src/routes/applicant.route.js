const express = require('express');
const ApplicantController = require('../controllers/applicantController');

const router = express.Router();

router.route('/apply').post(ApplicantController.application);

module.exports = router;