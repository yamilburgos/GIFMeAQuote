var express = require("express");
var router = express.Router();
var db = require("../models/queries");

router.get("/", function(req, res) {
    res.render("index");
    db.resetAll();
});

router.get("/entry", db.getImage, db.getName);
router.get("/results", db.getImage, db.getCaption);

module.exports = router;