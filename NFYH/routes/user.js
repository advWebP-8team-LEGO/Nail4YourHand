var express = require('express');
var router = express.Router();
const models = require('../models');
const crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('sample');
});
router.get('/sign_up', function(req, res, next) {
  res.render('user/sign_up')
})

router.post('/sign_up', function(req, res, next) {
  let body = req.body;

  let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    let result = models.User.create({
        name: body.userName,
        email: body.userEmail,
        password: hashPassword,
        salt: salt
    })

    res.redirect("/");
})

module.exports = router;
