const express = require("express");
const User = require("../model/user");
const wallet = require("../service/kas/wallet");
const node = require("../service/kas/node");
const conv = require("../utils/conv");
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

// TODO: get Klay API implementation
router.get("/:user/klay", async (req, res) => {
  const address = await conv.userTodoAddress(req.params.user);
  const balance = await node.getBalance(address);

  res.json({
    balance,
  });
});

// TODO: POST /v1/user/:user/klay API
router.post("/:user/klay", async (req, res) => {
  const from = await conv.userTodoAddress(req.params.user);
  const to = await conv.userTodoAddress(req.body.to);
  const amount = req.body.amount;
  console.log(from, to, amount);

  const txHash = await wallet.sendTransfer(from, to, amount);

  res.json({
    txHash,
  });
});

module.exports = router;
