const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

//* Index route
router.get('/', (req, res) => {
  res.render('index', {layout: './layouts/landing'});
});

//* Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    name: req.user.firstName,
  });
});
module.exports = router;
