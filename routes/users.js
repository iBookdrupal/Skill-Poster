const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

const {v1: uuidv1} = require('uuid');

//* Passport
const passport = require('passport');

//* Get userLogin
router.get('/login', (req, res) => {
  res.render('./users/login');
});

//* Get Register
router.get('/register', (req, res) => {
  // Now the `users` table in the database corresponds to the model definition

  res.render('./users/register');
});

//* Post User
router.post('/register', (req, res) => {
  let {firstName, lastName, gender, city, phone, state, email, password, password2} = req.body;

  let id = uuidv1().slice(0, 18);

  let errors = [];

  if (!firstName || !lastName || !phone || !email || !password) {
    errors.push({msg: 'Please fill in the fields '});
  }

  //* Check passwords match
  if (password !== password2) {
    errors.push({msg: 'Passwords do not match'});
  }

  //* Check Password Length
  if (password.length < 6) {
    errors.push({msg: 'Password should be at least 6 characters'});
  }

  if (errors.length > 0) {
    res.render('./users/register', {
      errors,
      firstName,
      lastName,
      gender,
      city,
      phone,
      state,
      email,
      password,
    });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      //var data = '123kkk333';
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        password = hash;
        Users.registerSchema
          .create({
            id,
            firstName,
            lastName,
            gender,
            city,
            phone,
            state,
            email,
            password,
            userRoleId: '1',
          })
          .then((users) => {
            req.flash('success_msg', 'You registered successfully, you can now login');
            res.redirect('./login');
          })
          .catch((err) => console.log(err));
      });
    });
  }
});

//* Login Authentication
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

//? Logout Handle
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

//* Assign User Role
router.get('/assignUserRole', (req, res) => {
  Users.UserRole.findAll()
    .then((userRole) => {
      res.render('./users/assignUserRole', {
        userRole,
        name: req.user.firstName,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
