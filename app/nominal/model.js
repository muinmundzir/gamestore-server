const mongoose = require('mongoose');
let nominalSchema = mongoose.Schema({
  coinQuantity: {
    type: Number,
    default: 0,
    // required: [true, 'nominal name must be filled'],
  },
  coinName: {
    type: String,
    required: [true, 'coin name must be filled'],
  },
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Nominal', nominalSchema);
