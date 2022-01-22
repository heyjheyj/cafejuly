const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagesSchema = mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId
    }
  },
  { timestamps: true }
);

const Images = mongoose.model("Images", imagesSchema);

module.exports = { Images };
