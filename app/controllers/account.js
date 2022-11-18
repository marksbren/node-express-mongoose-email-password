/*!
 * Module dependencies.
 */

exports.index = function(req, res) {
  res.render('account/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};
