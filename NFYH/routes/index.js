var express = require("express");
var router = express.Router();

router.use('/user', require('./user'));
router.use('/nail', require('./nail'));
router.use('/posts', require('./post'));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session); // session output
  const sess = req.session;
  
  if(sess.passport) {
    sess.userId = sess.passport.user.id;
    sess.userEmail = sess.passport.user.email;
    sess.userName = sess.passport.user.name;
  }

  res.render('index', {
    session: req.session
  });
});

module.exports = router;
