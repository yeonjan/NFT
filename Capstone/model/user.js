const mongoose = require("mongoose"); // using mongoose

const userSchema = new mongoose.Schema({
  name: String,
  address: String,
  password: String,
  publicKey: String,
});

const user = mongoose.model("User", userSchema);

module.exports = User;
