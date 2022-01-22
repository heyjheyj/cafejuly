const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/product");

const { auth } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  console.log(req.body);
  //가져온 이미지 저장하기
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename
      });
    }
  });
});

router.post("/", (req, res) => {
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  const limit = req.body.limit ? parseInt(req.body.limit) : 50;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;

  const term = req.body.searchValue;
  let findArgs = {};

  console.log("req body:", req.body);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      console.log("key", key);
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log("findArgs:", findArgs);

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        console.log(products);
        console.log("get products list");
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          products: products,
          postsize: products.length
        });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        console.log("get products list");
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          products: products,
          postsize: products.length
        });
      });
  }
});

router.get("/product_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;
  console.log(req.query);

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = [];
    productIds = ids.map((item) => {
      return item;
    });
  }

  // if (type === "array") {
  //   let ids = req.query.id.split(".");
  //   productIds = ids.map((item) => {
  //     console.log("item:", item);
  //     return item;
  //   });
  // }

  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      console.log("find err:", err);
      console.log("return product:", product);

      if (err) return res.status(400).send(err);
      return res.status(200).json({ product });
    });
});

module.exports = router;
