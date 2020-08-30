const mongoose = require('mongoose');

const LockerSchema = new mongoose.Schema({
  idl: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    required: true
  },
  who: {
    type: String,
    default: ""
  }
});

const Locker = mongoose.model('Locker', LockerSchema);

module.exports = Locker;