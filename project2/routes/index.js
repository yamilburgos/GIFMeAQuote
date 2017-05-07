var express = require("express");
var router = express.Router();
var db = require("../models/queries");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/entry", db.getNewImage, db.displayName, function(req, res) {
    console.log("URL:", res.locals.gifUrl);
    console.log("AUTHOR:", res.locals.authorName);

    res.render("entry", {
        gifUrl: res.locals.gifUrl,
        authorName: res.locals.authorName
    });
});

router.get("/results", db.getImage, db.displayCaption, db.getQuote, function(req, res) {

    res.render("results", {
        gifUrl: res.locals.gifUrl,
        captionName: res.locals.captionName,
        authorName: res.locals.authorName
    });

    db.resetImage();
    db.resetNames();
});

module.exports = router;