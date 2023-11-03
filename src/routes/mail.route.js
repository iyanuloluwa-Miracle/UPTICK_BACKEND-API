const express = require('express');
const MailController = require('../controllers/mailController');

const router = express.Router();

router.route('/sendMail').post(MailController.sendMail);

module.exports = router;