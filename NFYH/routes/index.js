var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/nail', require('./nail'));
router.use('/posts', require('./post'));
router.use('/multer', require('./multer'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    session: req.session
  });
});

module.exports = router;
