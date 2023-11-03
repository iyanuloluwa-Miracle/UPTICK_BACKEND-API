const express = require('express');
const mailRoute = require('./mail.route');
const applicantRoute = require('./applicant.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/applicant',
    route: applicantRoute,
  },
  {
    path: 'mail',
    route: mailRoute,
  }
]

defaultRoutes.forEach((val) => {
  router.use(val.path, val.route);
});

module.exports = router;