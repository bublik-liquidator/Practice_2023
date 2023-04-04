const express = require("express");
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

app.get("/", (request, response) => {
  response.json({ info: "Node.js + Express + Postgres API=meetup.app)" });
});

app.get("/meetup", db.getMeetup);

app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});
