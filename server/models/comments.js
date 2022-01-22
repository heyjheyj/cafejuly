const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const moment = require("moment-timezone");

// const dateSeoul = moment.tz.setDefault("Asia/Seoul");

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    productId: {
      type: String
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    content: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
