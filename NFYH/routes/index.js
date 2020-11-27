var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/posts', require('./post'));
router.use('/multer', require('./multer'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
