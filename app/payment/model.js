const mongoose = require('mongoose');

let paymentSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'type must be filled'],
    },
    status: {
      type: String,
      enum: ['Yes', 'No'],
      default: 'Yes',
    },
    banks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
