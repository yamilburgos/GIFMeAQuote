var promise = require("bluebird");
var options = { promiseLib: promise };
var pgp = require("pg-promise")(options);
var axios = require("axios");

var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

/* select * from players INNER JOIN status on (players.id = status.player_id); */

function grabNewGiphyImage(req, res, next) {
    axios.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC")
        .then((response) => {
            db.none("insert into giphyURL(url)" + "select $1" + "where not exists (select 1 from giphyURL where id = 1)",
                response.data.data.image_url);
            res.locals.gifUrl = response.data.data.image_url;
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
        return next();
    });
}

function getImage(req, res, next) {
    db.any("select * from giphyURL where id = 1").then(function(info) {
        res.locals.gifUrl = info[0].url;
        return next();
    });
}

function getQuote(req, res, next) {
    db.any("SELECT a.name, c.sentence FROM author a LEFT JOIN caption c ON c.id = a.id").then(function(info) {
        console.log("Let's go:", info);
        res.locals.authorName = info[0].name;
        res.locals.captionName = info[0].sentence;
        return next();
    });
}

function displayName(req, res, next) {
    if (req.query.author === "" || req.query.author === undefined) {
        req.query.author = 'Anon';
    }

    console.log("CHECKING THIS:", req.query.author);
    res.locals.authorName = req.query.author;

    db.none("insert into author(name)" + "values($1)", req.query.author).then(function(data) {
        console.log(data);
        return next();
    });
    //  insertName(req, res, next);
    //return next();
    //  }

    // db.any("select * from author").then(function(info) {
    //     res.locals.authorName = (info[0] === undefined) ? "Not Ready" : info[0].name;
    //     return next();
    // });
}

function insertName(req, res, next) {
    console.log(req.query.playerName);
    db.none("insert into players(name)" + "values($1)", req.query.authorName).then(res.redirect("/"));
}

function resetImage() {
    db.none("truncate table giphyURL restart identity");
}

function resetNames() {
    db.result("truncate author, caption restart identity CASCADE");
}

function displayCaption(req, res, next) {
    if (req.query.caption === "" || req.query.caption === undefined) {
        req.query.caption = 'Drawing a blank here';
    }

    console.log("CHECKING THIS:", req.query.caption);

    db.none("insert into caption(sentence)" + "values($1)", req.query.caption).then(function(data) {
        console.log(data);
        return next();
    });
}

function callQuote(req, res) {
    db.any("SELECT * FROM authors INNER JOIN caption ON (authors.id = caption.author_id)").then(function(info) {

        console.log("INFO:", info);
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
    getNewImage: getNewImage,
    resetImage: resetImage,

    getImage: getImage,
    getQuote: getQuote,
    displayCaption: displayCaption,

    displayName: displayName,
    resetNames: resetNames,

    callQuote: callQuote
};