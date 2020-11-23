var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/post', require('./post'));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
