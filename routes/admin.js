var _ = require("lodash");
var express = require("express");

var router = express.Router();
module.exports = router;

router.use(function (req, res, next) {
  if (req.user.admin) {
    next();
    return;
  }
  res.redirect("/login", { layout: false });
});

