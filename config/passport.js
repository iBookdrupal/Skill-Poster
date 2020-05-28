const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        //* Match User
        Users.registerSchema
          .findOne({email: email})
          .then((user) => {
            if (user == null) {
              return done(null, false, {message: 'That email is not registered '});
            }

            bcrypt.compare(password, user.password, function (err, isMatch) {
              if (err) throw console.log(err);
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {message: 'Password Incorrect'});
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (user, done) {
    done(null, {id: user.id, email: user.email, role: user.role});
  });
};
