const Transaction = require('../transaction/model');
const Voucher = require('../voucher/model');
const Player = require('../player/model');
const Category = require('../category/model');

module.exports = {
  index: async (req, res) => {
    try {
      const transactions = await Transaction.countDocuments();
      const vouchers = await Voucher.countDocuments();
      const players = await Player.countDocuments();
      const categories = await Category.countDocuments();
      res.render('admin/dashboard/view_dashboard', {
        count: { transactions, vouchers, players, categories },
        name: req.session.user.name,
        title: 'Dashboard Page',
      });
    } catch (error) {
      console.log(error);
    }
  },
};
