var express = require('express');
var router = express.Router();
const { viewSignIn, actionSignIn } = require('./controller');

/* GET category page. */
router.get('/', viewSignIn);
router.post('/', actionSignIn);

module.exports = router;
