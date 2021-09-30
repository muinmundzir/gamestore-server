var express = require('express');
var router = express.Router();
const { index, actionStatus } = require('./controller');
const { isLoginAdmin } = require('../middleware/auth');

/* GET home page. */
router.use(isLoginAdmin);
router.get('/', index);
router.put('/status/:id', actionStatus);
// router.get('/create', viewCreate);
// router.post('/create', actionCreate);
// router.get('/edit/:id', viewEdit);
// router.put('/edit/:id', actionEdit);
// router.delete('/delete/:id', actionDelete);
// router.put('/status/:id', actionStatus);

module.exports = router;
