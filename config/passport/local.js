/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');
const crypto = require('crypto');


/**
 * Expose
 */

module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
    // passReqToCallback : true
  },
  function(username, password, done) {
    User.findOne({email: username}).then((user) => {
      if (!user) { return done(null, false, { message: 'Incorrect email or password.' }); }
      // var saltBuf = Buffer.from(user.salt, 'utf-8');
      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        var base64Hash = hashedPassword.toString('base64')
        if (err) { return done(err); }
        if (!crypto.timingSafeEqual(Buffer.from(user.hashed_password, 'base64'), Buffer.from(base64Hash, 'base64'))) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user);
      });
    });
  }
);
