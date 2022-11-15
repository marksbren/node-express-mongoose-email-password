'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const passport = require('passport');

const home = require('../../app/controllers/home');
const login = require('../../app/controllers/login');
const signup = require('../../app/controllers/signup');
const User = mongoose.model('User');


const crypto = require('crypto');
const { userInfo } = require('os');


/**
 * Expose
 */

module.exports = function(app) {
  app.get('/', home.index);

  /**
   * Authentication
   */

  app.get('/login', function(req, res, next) {
    res.render('login',{ token: req.csrfToken() });
  });

  app.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.get('/logout', function(req, res, next) {
    req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
    });
    // req.logout(function(err) {
    //   if (err) { return next(err); }
    //   res.redirect('/');
    // });
  });

  app.get('/signup', function(req, res, next) {
    res.render('signup',{ token: req.csrfToken() });
  });

  app.post('/signup', function(req, res, next) {
    var salt = crypto.randomBytes(16).toString('base64');
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }
      User.findOne({email: req.body.email}).then((user) => {
        if(user){
          return res.status(400).json({msg:"Email already exists"})
        } else {
          const newUser = new User({
            email: req.body.email,
            hashed_password: hashedPassword.toString('base64'),
            salt: salt
          })
          newUser.save()
          return res.status(200).json({msg:{newUser}})
        }
      });
    });
  });

  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
