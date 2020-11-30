const express = require('express');
const router = express.Router();

// [GET]localhost:3000/nail
router.get('/', function (req, res, next) {
  res.render('nail', {
    session: req.session
  });
});

module.exports = router;