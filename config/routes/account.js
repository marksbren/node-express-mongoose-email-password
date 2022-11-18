'use strict';

const account = require('../../app/controllers/account');


const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

module.exports = function(app) {
  app.get("/account", secured, (req, res, next) => {
    const { _raw, _json, ...userProfile } = req.user;
    res.render("account", {
      title: "Account",
      userProfile: userProfile
    });
  });
}