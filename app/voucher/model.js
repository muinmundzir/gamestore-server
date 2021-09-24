const mongoose = require('mongoose');
let voucherSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name must be filled'],
  },
  status: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'Yes',
  },
  thumbnail: {
    type: String,
  },

  // code below acts like foreign id for relationship in SQL
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  nominals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nominal',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Voucher', voucherSchema);
