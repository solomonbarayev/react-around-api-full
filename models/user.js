const mongoose = require('mongoose');
const { urlRegex } = require('../helpers/consts');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlRegex.test(v),
        message: 'Invalid URL',
      },
    },
  },
  {
    // eslint-disable-next-line spaced-comment
    versionKey: false, //temporarily adding this to disable __v
  }
);

module.exports = mongoose.model('user', userSchema);
