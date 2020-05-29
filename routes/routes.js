const express = require('express');
const router = express.Router();

//* Database
const db = require('../config/database');

db.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.log('Error: ' + err));

//* Routes
router.use('/gigs', require('../routes/gigs'));
router.use('/users', require('../routes/users'));
router.use('/', require('../routes/index'));
router.use('/errors', require('../routes/errors/errors'));

module.exports = router;
