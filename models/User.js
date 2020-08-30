const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  plate: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  locker: {
    type: Number,
    default: 0
  },
  oscilloscope: {
    type: Number,
    default: 0
  },
  fgenerator: {
    type: Number,
    default: 0
  },
  multimeter: {
    type: Number,
    default: 0
  },
  font: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;