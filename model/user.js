var mongoose = require("mongoose"); // using mongoose

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  address: String,
  publicKey: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
