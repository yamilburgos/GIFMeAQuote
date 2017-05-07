var express = require("express");
var router = express.Router();
var db = require("../models/queries");

// Then create a transition ejs page after entry to display all of the captions for a set amount
// of time.

// Also create a transition ejs page after vote to show which caption gained votes and what player
// gained points, similar to first transition.

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/entry", db.getNewImage, db.displayName, function(req, res) {
    console.log("URL:", res.locals.gifUrl);
    console.log("P1 NAME:", res.locals.player1Name);
    console.log("P2 NAME:", res.locals.player2Name);
    console.log("P3 NAME:", res.locals.player3Name);
    console.log("P4 NAME:", res.locals.player4Name);

    res.render("entry", {
        gifUrl: res.locals.gifUrl,
        player1Name: res.locals.player1Name,
        player2Name: res.locals.player2Name,
        player3Name: res.locals.player3Name,
        player4Name: res.locals.player4Name
    });
});

router.get("/vote", function(req, res) {
    res.render("vote");
});

router.get("/results", function(req, res) {
    db.resetImage();
    db.resetNames();
    res.render("results");
});

router.get("/", db.getAllCaptions);
router.post("/", db.createCaption);
router.delete("/:id", db.removeCaption);
router.patch("/:id", db.updateSomething);

module.exports = router;