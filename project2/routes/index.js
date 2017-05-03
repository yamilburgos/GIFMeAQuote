var express = require('express');
var router = express.Router();
// var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
router.get('/', db.getAllContacts);
router.post('/', db.createContact);
router.delete('/:id', db.removeContact);
router.patch('/:id', db.updateContact);
*/

module.exports = router;