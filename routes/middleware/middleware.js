const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');

//* Passport config
require('../../config/passport')(passport);

//* body - parser
router.use(express.urlencoded({extended: false}));

//* Layouts
router.use(expressLayouts);

//* Set Static folder
router.use(express.static('public'));

//* Express session middleware
router.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

//* Connect flash
router.use(flash());

//* Passport Middleware
router.use(passport.initialize());
router.use(passport.session());

//* Global variables - middlewares
router.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.loggedIn = req.isAuthenticated();

  next();
});

module.exports = router;
