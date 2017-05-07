var promise = require("bluebird");
var options = { promiseLib: promise };
var pgp = require("pg-promise")(options);
var axios = require("axios");

var connectionString = "postgres://localhost:5432/gamegiphy";
var db = pgp(connectionString);

var counter = 1;

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
        return next();
    });
}

function displayName(req, res, next) {
    if (req.query.playerName === "" || req.query.playerName === undefined) {
        req.query.playerName = 'Lazy Player';
    }

    console.log("COUNTER:", counter);
    if (counter < 4) {
        console.log("CHECKING THIS:", req.query.playerName, counter);

        counter++;
        insertName(req, res, next);
        //return next();
    }

    db.any("select * from players").then(function(info) {
        res.locals.player1Name = (info[0] === undefined) ? "Not Ready" : info[0].name;
        res.locals.player2Name = (info[1] === undefined) ? "Not Ready" : info[1].name;
        res.locals.player3Name = (info[2] === undefined) ? "Not Ready" : info[2].name;
        res.locals.player4Name = (info[3] === undefined) ? "Not Ready" : info[3].name;

        return next();
    });
}

function insertName(req, res, next) {
    console.log(req.query.playerName);
    db.none("insert into players(name)" + "values($1)", req.query.playerName).then(res.redirect("/"));
}

function resetImage() {
    db.none("truncate table giphyURL restart identity");
}

function resetNames() {
    db.result("truncate players restart identity CASCADE");
    counter = 1;
}

// db.any("select * from players").then(function(info) {
//     console.log("ALL INFO:", info);

//     // for (var i = 0; i < 4; i++) {
//     //   if (info[i] === undefined) {
//     //    getName(req, res, next, i);
//     //         return this;
//     //    }
//     //  }


//     return next();
// }).catch((err) => {
//     console.log(err);
// });
// }

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

    displayName: displayName,
    resetNames: resetNames,

    createCaption: createCaption,
    getAllCaptions: getAllCaptions,
    removeCaption: removeCaption,
    updateSomething: updateSomething
};