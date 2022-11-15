'use strict';

/*
 * Module dependencies.
 */

const mongoose = require('mongoose');
const local = require('./passport/local');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');

/**
 * Expose
 */

module.exports = function(passport) {
  // serialize and deserialize sessions
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findOne({ _id: id }, done));

  // passport.use(new LocalStrategy(function verify(email, password, cb) {
  //   console.log(email)
  //   User.findOne({email: email}).then((user) => {
  //     if (err) { return cb(err); }
  //     if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      
  //     crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
  //       if (err) { return cb(err); }
  //       if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
  //         return cb(null, false, { message: 'Incorrect username or password.' });
  //       }
  //       return cb(null, row);
  //     });
  //   });
  // }));

  // use these strategies
  passport.use(local);
};
