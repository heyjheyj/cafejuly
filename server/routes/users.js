const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/product");
const { Payment } = require("../models/payment");
const async = require("async");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, userInfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
        userInfo
      });
    }
  );
});

router.get("/removeFromCart", auth, (req, res) => {
  console.log(req.query);

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        cart: { id: req.query.id }
      }
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });
      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, productInfo) => {
          if (err) res.status(400).send(err);
          return res.status(200).json({ success: true, productInfo, cart });
        });
    }
  );
});

router.post("/successBuy", auth, (req, res) => {
  console.log(req.body.paymentData);
  console.log(req.body.cartData);

  let history = [];
  let transactionData = {};

  req.body.cartData.forEach((item) => {
    history.push({
      dataOfPurchase: Date.now(),
      name: item.productname,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentId
    });
  });

  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.status(400).json({ success: false, err });
      console.log("purchase user", user);
      const payment = new Payment(transactionData);

      payment.save((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });

        let product = [];
        doc.product.forEach((item) => {
          product.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          product,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity
                }
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.status(400).json({ success: false, err });
            res
              .status(200)
              .json({ success: true, cart: user.cart, cartData: [] });
          }
        );
      });
    }
  );
});

router.post("/purchased", auth, (req, res) => {
  console.log("purchased:", req.user._id);

  User.findOne({ _id: req.user.id }, (err, userInfo) => {
    if (err) return res.status(400).json({ success: false });
    res.status(200).json({ success: true, userInfo });
  });
});

router.post("/addToCart", auth, (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.user:", req.user);

  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    console.log("userInfo:", userInfo);

    let duplicate = false;

    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": req.body.quantities } },
        { new: true },
        (err, userInfo) => {
          if (err) {
            console.log("failed to update:", err);
            return res.status(400).json({ success: false, err });
          }
          return res.status(200).json(userInfo.cart);
        }
      );
    } else {
      console.log("not duplicate");
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: req.body.quantities,
              data: Date.now()
            }
          }
        },
        { new: true },
        (err, userinfo) => {
          console.log("findOneAndUpdate result err:", err);
          console.log("findOneAndUpdate result userinfo:", userinfo);

          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json(userInfo.cart);
        }
      );
    }
  });
});

module.exports = router;
