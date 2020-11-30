const express = require("express");
const router = express.Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: __dirname + "/upload",
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "_" +
        Math.floor(Math.random() * 10) +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({
  storage,
});

router.post("/single", upload.single("image"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send({
    file: req.file,
    body: req.body,
  });
}); // image가 키값

module.exports = router;
