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
          .findOne({where: {email: email}})
          .then((user) => {
            if (!user) {
              return done(null, false, {message: 'Invalid username / password'});
            }

            bcrypt.compare(password, user.password, function (err, isMatch) {
              if (err) throw console.log(err);
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {message: 'Invalid username / password'});
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log(id);
    Users.registerSchema.findOne({where: {id: id}}).then((user) => {
      done(null, user);
    });
  });
};
