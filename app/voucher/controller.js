const Voucher = require('./model');
const Category = require('../category/model');
const Nominals = require('../nominal/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const voucher = await Voucher.find()
        .populate('category')
        .populate('nominals');
      res.render('admin/voucher/view_voucher', { voucher, alert });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const categories = await Category.find();
      const nominals = await Nominals.find();
      res.render('admin/voucher/create', { categories, nominals });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on('end', async () => {
          try {
            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnail: filename,
            });

            await voucher.save();

            req.flash('alertMessage', 'Voucher has been saved');
            req.flash('alertStatus', 'success');
            res.redirect('/voucher');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
          }
        });
      } else {
        const voucher = new Voucher({
          name,
          category,
          nominals,
        });

        await voucher.save();

        req.flash('alertMessage', 'Voucher has been saved');
        req.flash('alertStatus', 'success');
        res.redirect('/voucher');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominals = await Nominals.find();
      const category = await Category.find();
      const voucher = await Voucher.findOne({ _id: id })
        .populate('nominals')
        .populate('category');
      res.render('admin/voucher/edit', { voucher, nominals, category });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on('end', async () => {
          try {
            const voucher = await Voucher.findOne({ _id: id });

            let currImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currImage)) {
              fs.unlinkSync(currImage);
            }

            await Voucher.findOneAndUpdate(
              { _id: id },
              { name, category, nominals, thumbnail: filename }
            );

            req.flash('alertMessage', 'Voucher has been updated');
            req.flash('alertStatus', 'success');
            res.redirect('/voucher');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
          }
        });
      } else {
        await Voucher.findOneAndUpdate(
          { _id: id },
          { name, category, nominals }
        );

        req.flash('alertMessage', 'Voucher has been updated');
        req.flash('alertStatus', 'success');
        res.redirect('/voucher');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const voucher = await Voucher.findOneAndRemove({ _id: id });

      let currImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
      if (fs.existsSync(currImage)) {
        fs.unlinkSync(currImage);
      }

      req.flash('alertMessage', 'Voucher has been deleted');
      req.flash('alertStatus', 'success');
      res.redirect('/voucher');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
};
