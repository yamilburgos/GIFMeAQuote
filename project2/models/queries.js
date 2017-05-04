var promise = require('bluebird');
var options = { promiseLib: promise };
var axios = require('axios');
var pgp = require('pg-promise')(options);

var connectionString = 'postgres://localhost:5432/contacts_db';
var db = pgp(connectionString);

//var url = `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC`

function apiCall(req, res, next) {
    console.log('apiCall() is awake');
    axios.get(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC`)
        .then((res) => {
            var thenCall = res.data.data.url;
            console.log(thenCall);
            return thenCall;
        })
};

function createContact(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into contacts(first, last, age, sex)' +
            'values(${first}, ${last}, ${age}, ${sex})', req.body)
        .then(res.redirect('/'));
}

function getAllContacts(req, res, next) {
    db.any('select * from contacts').then(function(info) {
        res.render('index', { title: 'All Contacts', data: info });
    })
}

function removeContact(req, res, next) {
    let contactID = parseInt(req.params.id);
    console.log(contactID);
    db.result('delete from contacts where id = $1', contactID);
}

function updateContact(req, res, next) {
    db.none('update contacts set first=$1 where id =$2', [req.body.first, parseInt(req.params.id)]);
}

module.exports = {
    apiCall: apiCall,
    createContact: createContact,
    getAllContacts: getAllContacts,
    removeContact: removeContact,
    updateContact: updateContact
}