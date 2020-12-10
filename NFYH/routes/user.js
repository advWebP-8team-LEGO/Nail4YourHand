var express = require("express");
var router = express.Router();
const models = require("../models");
const crypto = require("crypto");

/* GET users listing. */
<<<<<<< HEAD
router.get('/', function (req, res, next) {
  res.render('user/sample');
});

router.get('/sign_up', function (req, res, next) {
  res.render('join')
})

router.post('/sign_up', function (req, res, next) {
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
=======
router.get("/", function (req, res, next) {
  res.render("user/sample");
});

router.get("/sign_up", function (req, res, next) {
  res.render("user/sign_up");
});

router.post("/sign_up", function (req, res, next) {
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");
>>>>>>> Google-Login

  let result = models.User.create({
    name: body.userName,
    email: body.userEmail,
    password: hashPassword,
<<<<<<< HEAD
    salt: salt
  })

  res.redirect("/");
})

router.get('/login', function (req, res, next) {
  let session = req.session;

  res.render("login", {
    session: session
=======
    salt: salt,
  });

  res.redirect("/");
});

router.get("/login", function (req, res, next) {
  let session = req.session;

  res.render("user/login", {
    session: session,
>>>>>>> Google-Login
  });
});

router.post("/login", async function (req, res, next) {
  let body = req.body;

  let result = await models.User.findOne({
    where: {
<<<<<<< HEAD
      email: body.userEmail
    }
=======
      email: body.userEmail,
    },
>>>>>>> Google-Login
  });

  console.log("login!");
  console.log(result);

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  if (dbPassword === hashPassword) {
    console.log("비밀번호 일치");
<<<<<<< HEAD
    req.session.userId = result.id;
    req.session.userEmail = result.email;
    req.session.userName = result.name;
    res.redirect("/");
=======
    req.session.email = body.userEmail;
    res.redirect("/user/login");
>>>>>>> Google-Login
  } else {
    console.log("비밀번호 불일치");
    res.redirect("/user/login");
  }
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.clearCookie("sid");

<<<<<<< HEAD
  res.redirect("/")
})
=======
  res.redirect("/user/login");
});
>>>>>>> Google-Login

module.exports = router;