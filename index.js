const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");

const app = express();
const db = require("./queries");
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// const errorHandler = (error, request, response, next) => {
//     // Error handling middleware functionality
//     console.log(`error ${error.message}`) // log the error
//     const status = error.status || 400
//     // send back an easily understandable error message to the caller
//     response.status(status).send(error.message)
// }
// app.use(errorHandler)

app.get("/", (request, response) => {
    response.json({ info: "Node.js + Express + Postgres API=meetup.app" });
});

app.get("/meetup",  db.getMeetup);
app.get("/meetup/:id", db.getMeetupById);
app.post("/meetup", db.createMeetup);
app.put("/meetup/:id", db.updateMeetup);
app.delete("/meetup/:id", db.deleteMeetup);

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});

// process.on
// (
//     'uncaughtException',
//     function (err)
//     {
//         console.log(err)
//         var stack = err.stack;
//         return null;
//         //you can also notify the err/stack to support via email or other APIs
//     }
// );