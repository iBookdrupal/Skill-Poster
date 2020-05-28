const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

//* Database
const db = require('./config/database');

db.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.log('Error: ' + err));

//* Passport config
require('./config/passport')(passport);
const app = express();

app.set('view engine', 'ejs');

//* Default Layout
app.set('layout', './layouts/layout');
app.use(expressLayouts);

//* Set Static folder
app.use(express.static('public'));

//* body - parser
app.use(express.urlencoded({extended: true}));

//* Express session middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

//* Connect flash
app.use(flash());

//* Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//* Global variables - middlewares
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
//* Gig routes
app.use('/gigs', require('./routes/gigs'));
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
