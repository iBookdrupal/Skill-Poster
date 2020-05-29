const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const Users = require('../models/Users');

//* Index route
router.get('/', (req, res) => {
  res.render('index', {layout: './layouts/landing'});
});

//* Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {email: req.user.email, name: `${req.user.firstName} ${req.user.lastName}`});
});

module.exports = router;
