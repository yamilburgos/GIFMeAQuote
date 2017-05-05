var express = require('express');
var router = express.Router();
var db = require('../models/queries');
var axios = require('axios');

// Figure out code to have the browser wait for other people after a button click for several pages.
// >>> This will be for: Index, Entry, Vote & Results.

// Then create a transition ejs page after entry to display all of the captions for a set amount of time.

// Also create a transition ejs page after vote to show which caption gained votes and what player gained points, similar to first transition.

var title = 'GIF Me A Laugh!';

router.get('/', function(req, res, next) {
    res.render('index', { title: title });
});

function apiCall(req, response, next) {
    axios.get(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC`)
        .then((res) => {
            response.locals.gifUrl = res.data.data.image_url;
            console.log(response.locals.gifUrl);
            return next();
        }).catch((err) => {
            console.log(err);
        })
};

router.get('/entry', apiCall, (req, res, next) => {
    res.render('entry', {
        title: title,
        gifUrl: res.locals.gifUrl
    })
});

router.get('/vote', function(req, res, next) {
    console.log("What about this?");
    res.render('vote', { title: title });
});

router.get('/results', function(req, res, next) {
    console.log("And Finally this?");
    res.render('results', { title: title });
});

router.get('/', db.getAllContacts);
router.post('/', db.createContact);
router.post('/entry', db.apiCall);
router.delete('/:id', db.removeContact);
router.patch('/:id', db.updateContact);

module.exports = router;