const mongoose = require('mongoose');
const urlRegex = require('../utils/regex');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'Invalid URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Valid email is required',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user;
      });
    });
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  const { password, ...rest } = obj;
  return rest;
};

module.exports = mongoose.model('user', userSchema);
