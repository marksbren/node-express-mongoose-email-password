/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * User schema
 */

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({});

// UserSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// UserSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

// UserSchema.methods.authenticate = function(password){
//   crypto.pbkdf2(password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//     if (err) { return false }
//     if (!crypto.timingSafeEqual(hashed_password, hashedPassword)) {
//       return false//cb(null, false, { message: 'Incorrect username or password.' });
//     }
//     return true; //cb(null, row);
//   })
// };

/**
 * Statics
 */

UserSchema.static({});

/**
 * Register
 */

mongoose.model('User', UserSchema);
