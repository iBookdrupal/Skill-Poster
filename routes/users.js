const express = require('express');
const router = express.Router();

//* Passport

//* Router for User Model

//* Get userLogin
router.get('/login', (req, res) => {
  res.render('./users/login');
});

//* Get Register
router.get('/register', (req, res) => {
  res.render('./users/register');
});

//* Assign User Role
router.get('/assignUserRole', (req, res) => {
  res.render('./users/assignUserRole');
});

module.exports = router;
