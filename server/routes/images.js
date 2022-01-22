const express = require("express");
const router = express.Router();
const { Images } = require("../models/images");

router.get("/getMainImages", (req, res) => {
  let id = "61dd612a943097da6fd0436a";

  Images.find({ _id: id }).exec((err, images) => {
    let arr1 = images[0];
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, arr1 });
  });
});

module.exports = router;
