// to create a Klaytn account when signing up.
const bodyParser = require("body-parser"); // for json request body
const express = require("express");
const mongoose = require("mongoose");
const user = require("./controller/user"); // basic controller

mongoose.connect("mongodb://mongo.kas-tutorial:27017/kas-tutorial", {
  //mongodn connection
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/v1/user", user); // express controller enrollment
app.listen(8080, () => {
  console.log("Example app listening at http://localhost:8080");
});
