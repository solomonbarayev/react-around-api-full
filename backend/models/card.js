const mongoose = require('mongoose');
const urlRegex = require('../utils/regex');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlRegex.test(v),
        message: 'Invalid URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // eslint-disable-next-line spaced-comment
    versionKey: false, //temporarily adding this to disable __v
  }
);

module.exports = mongoose.model('card', cardSchema);
