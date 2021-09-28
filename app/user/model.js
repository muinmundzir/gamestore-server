const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email must be filled'],
    },
    name: {
      type: String,
      required: [true, 'Name must be filled'],
    },
    password: {
      type: String,
      required: [true, 'Password must be filled'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin',
    },
    status: {
      type: String,
      enum: ['Yes', 'No'],
      default: 'Yes',
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number must be filled'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
