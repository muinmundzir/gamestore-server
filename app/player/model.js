const mongoose = require('mongoose');

let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email must be filled'],
    },
    name: {
      type: String,
      required: [true, 'Name must be filled'],
      maxlenght: [225, 'Name length must between 3 - 225 characters'],
      minlenght: [3, 'Name length must between 3 - 225 characters'],
    },
    username: {
      type: String,
      required: [true, 'Name must be filled'],
      maxlenght: [225, 'Name length must between 3 - 225 characters'],
      minlenght: [3, 'Name length must between 3 - 225 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password must be filled'],
      minlenght: [8, 'Password length must more than 8 characters'],
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
    avatar: {
      type: String,
    },
    filename: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number must be filled'],
      maxlenght: [14, 'Phone number lenght must between 9 - 14 characters'],
      minlenght: [9, 'Phone number lenght must between 9 - 14 characters'],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
