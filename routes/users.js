const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

const {v1: uuidv1} = require('uuid');

//* Passport

//* Router for User Model

//* Get userLogin
router.get('/login', (req, res) => {
  res.render('./users/login');
});

//* Get Register
router.get('/register', (req, res) => {
  // Now the `users` table in the database corresponds to the model definition

  res.render('./users/register');
});
/*
let getGender = function () {
  var e = req.body.gender.getElementById('mySelect');
  var getGender = e.options[e.selectedIndex].text;

  return getGender;
};
gender = getGender();
*/

//* Post User
router.post('/register', (req, res) => {
  let {firstName, lastName, gender, city, phone, state, email, password} = req.body;

  let id = uuidv1().slice(0, 18);

  let errors = [];

  if (!firstName || !lastName || !phone || !email || !password) {
    errors.push({msg: 'Please fill in the fields '});
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
    /*Users.registerSchema
      .sync({force: false})
      .then(() => {
        bcrypt.genSalt(10, function (err, salt) {
          //var data = '123kkk333';
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            req.body.password = hash;
          });
        });
        Users.registerSchema.create({
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
        });

        return res.redirect('./login');
      })
      .catch((err) => console.log(err));
      */

    bcrypt.genSalt(10, function (err, salt) {
      //var data = '123kkk333';
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        password = hash;
        //Users.registerSchema.create({password});
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
          .then((user) => res.redirect('./login'))
          .catch((err) => console.log(err));
      });
    });
  }
});

//* Assign User Role
router.get('/assignUserRole', (req, res) => {
  Users.UserRole.findAll()
    .then((userRole) => {
      res.render('./users/assignUserRole', {
        userRole,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
