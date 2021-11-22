// to create a Klaytn account when signing up.
const bodyParser = require("body-parser"); // for json request body
const express = require("express");
const mongoose = require("mongoose");
const user = require("./controller/user"); // basic controller
const asset = require("./controller/asset");

mongoose
  .connect(
    "mongodb+srv://kas-tutorial:kas-tutorial@cluster0.zse1m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      //mongodb atlas connection
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Successfully connected to MongoDB..."))
  .catch(error => console.log(error));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/v1/user", user);
app.use("/v1/asset", asset); // express controller enrollment
// TODO: adds search route
// app.use("/v1/search", search);

app.listen(8080, () => {
  console.log("Starting at http://localhost:8080\n");
});
