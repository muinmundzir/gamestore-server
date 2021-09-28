const mongoose = require('mongoose');
let categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'category name must be filled'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
