var express = require('express');
var router = express.Router();
// var db = require('../queries');


// Figure out code to have the browser wait for other people after a button click for several pages.
// >>> This will be for: Index, Entry, Vote & Results.

// Then create a transition ejs page after entry to display all of the captions for a set amount of time.

// Also create a transition ejs page after vote to show which caption gained votes and what player gained points, similar to first transition.

var title = 'GIF Me A Laugh!';

router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});

router.get('/entry', function(req, res, next) {
	console.log("Did this happen?");
  res.render('entry', { title: title });
});

router.get('/vote', function(req, res, next) {
	console.log("What about this?");
  res.render('vote', { title: title });
});

router.get('/results', function(req, res, next) {
	console.log("And Finally this?");
  res.render('results', { title: title });
});

/*
router.get('/', db.getAllContacts);
router.post('/', db.createContact);
router.delete('/:id', db.removeContact);
router.patch('/:id', db.updateContact);
*/

module.exports = router;