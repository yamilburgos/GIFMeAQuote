var express = require("express");
var router = express.Router();
var db = require("../models/queries");

// Figure out code to have the browser wait for other people after a button click for several pages.
// >>> This will be for: Index, Entry, Vote & Results.

// Then create a transition ejs page after entry to display all of the captions for a set amount
// of time.

// Also create a transition ejs page after vote to show which caption gained votes and what player
// gained points, similar to first transition.

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/entry", db.getGIPHYImage, function(req, res) {
    res.render("entry", {
        gifUrl: res.locals.gifUrl
    });
});

router.get("/vote", function(req, res) {
    res.render("vote");
});

router.get("/results", function(req, res) {
    res.render("results");
});

router.get("/", db.getAllCaptions);
router.post("/", db.createCaption);
router.delete("/:id", db.removeCaption);
router.patch("/:id", db.updateSomething);

module.exports = router;