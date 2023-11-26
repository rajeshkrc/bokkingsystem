const express = require("express");
const app = express();
const cors = require("cors");
const bookTicketRouter = require("./api/bookticket");
const db = require("./model");

db.mongoose.connect(db.url).then(() => {
    console.log("Connected to mongodb");
}).catch(error => {
    console.log("Cannot connect to the database!", error);
    process.exit();
});

db.mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to db on port ${process.env.MONGODB_LOCAL_PORT}`);
});

db.mongoose.connection.on('error', err => {
    console.log(err.message);
  });

db.mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

process.on('SIGINT', () => {
    db.mongoose.connection.close(() => {
        console.log('Mongoose connection is disconnected due to app termination...');
        process.exit(0);
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api', bookTicketRouter);

module.exports = app;
