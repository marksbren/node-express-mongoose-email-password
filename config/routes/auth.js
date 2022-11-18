'use strict';

const mongoose = require('mongoose');
const passport = require('passport');

const login = require('../../app/controllers/login');
const signup = require('../../app/controllers/signup');
const User = mongoose.model('User');

const { sendMail } = require('../../app/mailers/forgot-email')


const crypto = require('crypto');

module.exports = function(app) {

  /**
   * Authentication
   */

  app.get('/login', function(req, res, next) {
    sendMail("marksbren@gmail.com","Mark","1234");
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

}