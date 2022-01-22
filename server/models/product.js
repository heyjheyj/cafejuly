const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    productname: {
      type: String,
      maxlength: 50
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      default: 0
    },
    cookies: {
      type: Number,
      default: 1
    },
    images: {
      type: Array,
      default: []
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// control search results with weights(mongodb site)

productSchema.index(
  {
    productname: "text",
    description: "text"
  },
  {
    weights: {
      productname: 5,
      description: 1
    }
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
