var express = require('express');
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
} = require('./controller');
const multer = require('multer');
const os = require('os');

/* GET category page. */
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
// router.delete('/delete/:id', actionDelete);
// router.put('/status/:id', actionStatus);

module.exports = router;
