const mongoose = require('mongoose');

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: {
        type: String,
        require: [true, 'Game name must be filled'],
      },
      category: {
        type: String,
        require: [true, 'Category must be filled'],
      },
      thumbnail: {
        type: String,
      },
      coinName: {
        type: String,
        require: [true, 'Coin name must be filled'],
      },
      coinQuantity: {
        type: Number,
        require: [true, 'Coin quantity must be filled'],
      },
      price: {
        type: Number,
      },
    },
    historyPayment: {
      name: {
        type: String,
        require: [true, 'Game name must be filled'],
      },
      type: {
        type: String,
        require: [true, 'Payment type must be filled'],
      },
      bankName: {
        type: String,
        require: [true, 'Bank name must be filled'],
      },
      accountNumber: {
        type: Number,
        require: [true, 'Account number must be filled'],
      },
    },
    name: {
      type: String,
      required: [true, 'Name must be filled'],
      maxlenght: [225, 'Name length must between 3 - 225 characters'],
      minlenght: [3, 'Name length must between 3 - 225 characters'],
    },
    accountUser: {
      type: String,
      required: [true, 'Name account must be filled'],
      maxlenght: [225, 'Name length must between 3 - 225 characters'],
      minlenght: [3, 'Name length must between 3 - 225 characters'],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    historyUser: {
      type: String,
      require: [true, 'User name must be filled'],
      phoneNumber: {
        required: [true, 'Name must be filled'],
        maxlenght: [13, 'Name length must between 9 - 13 characters'],
        minlenght: [9, 'Name length must between 9 - 13 characters'],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
