const express = require("express");
const router = express.Router();
const { Comment } = require("../models/comments");

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) {
      return res.json({ success: false, err });
    }

    // Comment.find({ writer: req.body.writer }).exec((err, info) => {
    //   console.log("comment find");
    //   if (err) return res.status(400).send(err);
    //   return res.status(200).json({ success: true, comment });
    // });
    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, info) => {
        console.log("comment find");
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, info });
      });
  });
});

router.post("/getComments", (req, res) => {
  console.log("get Comment:", req.body.productId);
  Comment.find({ productId: req.body.productId })
    .populate("writer")
    .exec((err, comments) => {
      console.log("find comments");
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
