const express = require("express");
const multer = require("multer");
const conv = require("../utils/conv");
const Metadata = require("../model/metadata");
const kip17 = require("../service/kas/kip17");
var router = express.Router();
const endpoint = "http://10.1.1.2";

var storage = multer.diskStorage({
  // The storage where metadata and images are uploaded.
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    var filetype = file.originalname.substring(file.originalname.length - 3);
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});
var upload = multer({ storage: storage });

//TODO: POST /v1/asset/:user/issue API
router.post(
  "/:user/issue",
  upload.single("file"), // Upload the image that came into the file to the storage.
  async function (req, res, next) {
    console.log(req.body);
    console.log(req.params);
    if (!req.file) {
      res.status(500);
      return next(err);
    }

    const img = endpoint + "/images/" + req.file.filename; // Extract the image uri.

    // Todo: save metadata
    const metadata = new Metadata({
      name: req.body.name,
      description: req.body.kind,
      kind: req.body.kind,
      image: img,
    });
    const doc = await metadata.save();
    const id = "0x" + doc._id.toString(); // Use mongodb schemas'id as the token ID.
    const uri = `${endpoint}/v1/metadata/${id}`; // bring metadata json
    const address = await conv.userToAddress(req.params.user);

    await kip17.issueToken(address, id, uri); // using API

    res.json({ metadata: doc._id.toString() });
  }
);

module.exports = router;
