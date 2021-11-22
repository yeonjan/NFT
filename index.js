// to create a Klaytn account when signing up.
const bodyParser = require("body-parser"); // for json request body
const express = require("express");
const mongoose = require("mongoose");
const user = require("./controller/user"); // basic controller
const asset = require("./controller/asset");
// TODO: imports search controller
const search = require("./controller/search");

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
  .catch((error) => console.log(error));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/v2/account", user); // express controller enrollment
app.use("/v1/klaytn", user); // account's balance check
app.use("/v2/tx/value", user); // klay transfer
app.use("/v2/transfer/account", user); // klay transfer check
app.use("/v1/asset", asset); // mint kip-17
// TODO: adds search route
app.use("/v2/search", search);

app.listen(8080, () => {
  console.log("Starting at http://localhost:8080\n");
});
