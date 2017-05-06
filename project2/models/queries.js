var promise = require("bluebird");
var options = { promiseLib: promise };
var pgp = require("pg-promise")(options);
var axios = require("axios");

var connectionString = "postgres://localhost:5432/gamegiphy";
var db = pgp(connectionString);

/* select * from players INNER JOIN status on (players.id = status.player_id); */

function grabNewGiphyImage(req, res, next) {
    axios.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC")
        .then((response) => {
            db.none("insert into giphyURL(url)" + "select $1" + "where not exists (select 1 from giphyURL where id = 1)",
                response.data.data.image_url);

            console.log("THIS WAS CALLED TO DO SOMETHING!");
            res.locals.gifUrl = response.data.data.image_url;
            console.log("URLLLL:", res.locals.gifUrl);
            return next();

        }).catch((err) => {
            console.log(err);
        });
}

function getNewImage(req, res, next) {
    db.any("select * from giphyURL where id = 1").then(function(info) {
        if (info[0] === undefined) {
            grabNewGiphyImage(req, res, next);
            return this;
        }

        res.locals.gifUrl = info[0].url;
        console.log("FINAL QUERY:", res.locals.gifUrl);
        return next();
    });
}

function resetImage() {
    db.none("truncate table giphyURL restart identity");
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
    getNewImage: getNewImage,
    resetImage: resetImage,

    createCaption: createCaption,
    getAllCaptions: getAllCaptions,
    removeCaption: removeCaption,
    updateSomething: updateSomething
};