const express = require("express");
const user = require("../model/user");
const wallet = require("../service/kas/wallet");
const router = express.Router();

router.post("/", async (req, res) => {
  // When sign-up

  // TODO: create an account API
  const account = await wallet.createAccount(); // wallet API
  console.log(account);

  // Todo: save address, userid, password, publicKey
  const user = new User({
    name: req.body.username,
    password: req.body.password,
    address: account.address,
    publicKey: account.publicKey,
  });

  user.save((err, doc) => {
    if (err) console.error(err);
    console.log(doc);
  });

  res.json({
    address: account.address,
  });
});

module.exports = router;
