const User = require('./model');
const bcrypt = require('bcryptjs');

module.exports = {
  viewSignIn: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/user/view_sign_in', { alert });
      } else {
        res.redirect('/dashboard');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
  actionSignIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await User.findOne({ email: email });
      console.log(email);
      if (!check) {
        req.flash('alertMessage', 'Oops! User with that email not found');
        req.flash('alertStatus', 'danger');
        res.redirect('/');
      }
      if (check.status === 'Yes') {
        const checkPassword = await bcrypt.compare(password, check.password);

        if (!checkPassword) {
          req.flash('alertMessage', 'Wrong password');
          req.flash('alertStatus', 'danger');
          res.redirect('/');
        }

        req.session.user = {
          id: check._id,
          email: check.email,
          status: check.status,
          name: check.name,
        };
        res.redirect('/dashboard');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
};
