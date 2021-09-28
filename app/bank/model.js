const mongoose = require('mongoose');
let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name must be filled'],
    },
    bankName: {
      type: String,
      require: [true, 'bank name must be filled'],
    },
    accountNumber: {
      type: String,
      require: [true, 'account number must be filled'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bank', bankSchema);
