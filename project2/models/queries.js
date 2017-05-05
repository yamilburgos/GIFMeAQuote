var promise = require("bluebird");
var options = { promiseLib: promise };
var pgp = require("pg-promise")(options);
var axios = require("axios");

var connectionString = "postgres://localhost:5432/contacts_db";
var db = pgp(connectionString);


function getGiphyImage(req, res, next) {
    axios.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC")
        .then((response) => {
            res.locals.gifUrl = response.data.data.image_url;
            console.log(res.locals.gifUrl);
            return next();
        }).catch((err) => {
            console.log(err);
        });
}

function createCaption(req, res) {
    req.body.age = parseInt(req.body.age);
    db.none("insert into contacts(first, last, age, sex)" +
            "values(${first}, ${last}, ${age}, ${sex})", req.body)
        .then(res.redirect("/"));
}

function getAllCaptions(req, res) {
    db.any("select * from contacts").then(function(info) {
        res.render("index", { title: "All Contacts", data: info });
    });
}

function removeCaption(req, res) {
    var contactID = parseInt(req.params.id);
    console.log(contactID);
    db.result("delete from contacts where id = $1", contactID);
}

function updateSomething(req, res) {
    db.none("update contacts set first=$1 where id =$2", [req.body.first, parseInt(req.params.id)]);
}

module.exports = {
    getGIPHYImage: getGiphyImage,

    createCaption: createCaption,
    getAllCaptions: getAllCaptions,
    removeCaption: removeCaption,
    updateSomething: updateSomething
};