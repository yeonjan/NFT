const express = require("express");
const caver = require("caver-js");
const User = require("../model/user");
const wallet = require("../service/kas/wallet");
const node = require("../service/kas/node");
const th = require("../service/kas/th");
const conv = require("../utils/conv");
const router = express.Router();

router.post("/", async (req, res) => {
  // When sign-up

  // TODO: create a Klaytn account API
  const account = await wallet.CreateAccount(); // wallet API
  console.log(account);

  // Todo: save address, publicKey to mongoose---
  const user = new User({
    name: req.body.username,
    password: req.body.password,
    address: account.address,
    publicKey: account.publicKey,
  });

  console.log(user.name, user.password);

  user.save((err, doc) => {
    if (err) console.error(err);
    console.log(doc);
  });
  // --------------------------------------------

  res.json({
    // return address
    address: account.address,
  });
});

// TODO: get Klay API implementation
router.post("/:user/klay", async (req, res) => {
  const address = await conv.userToAddress(req.params.user);
  const balance = await node.getBalance(address);

  res.json({
    balance,
  });
});

// TODO: POST /v2/user/:user/klay API. klay transaction.
router.post("/:user/klay/send", async (req, res) => {
  const from = await conv.userToAddress(req.params.user);
  const to = await conv.userToAddress(req.body.to);
  const amount = req.body.amount;
  console.log(from, to, amount);

  const txHash = await wallet.sendTransfer(from, to, amount);

  res.json({
    txHash,
  });
});

// TODO: GET /v2/user/:use/klay/transfer-history?start-timestamp=:ts&end-timestamp=:ts API
router.get("/:user/klay/transfer-history", async (req, res) => {
  const address = await conv.userToAddress(req.params.user);
  const starttime = req.query["start-timestamp"];
  const endtime = req.query["end-timestamp"];

  const history = await th.klayHistory(address, starttime, endtime);
  const ret = [];
  for (const el of history) {
    const klay = caver.utils.convertFromPeb(
      caver.utils.hexToNumberString(el.value),
      "KLAY"
    );

    const item = {
      value: klay,
      timestamp: el.timestamp,
    };
    let target = "";

    if (caver.utils.toChecksumAddress(el.from) === address) {
      item.eventType = "sent";
      target = el.to;
    } else {
      item.eventType = "received";
      target = el.from;
    }

    const targetuser = await conv.addressToUser(target);
    item.target = targetuser !== "" ? targetuser : target;
    ret.push(item);
  }

  res.json(ret);
});

module.exports = router;
