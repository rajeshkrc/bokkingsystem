const dbConfig = require("../config/dbConfig.js");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.train = require("./train.model.js")(mongoose);
db.coach = require("./coach.model.js")(mongoose);
db.row = require("./row.model.js")(mongoose);
db.seat = require("./seat.model.js")(mongoose);
db.bookedseats = require("./bookedseats.model.js")(mongoose);

module.exports = db;
