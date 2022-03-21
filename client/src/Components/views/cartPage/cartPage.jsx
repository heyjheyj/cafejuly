import React, { useState, useEffect, useCallback } from "react";
import styles from "./cartPage.module.css";
import Axios from "axios";
import UserCards from "./section/userCards";
import { Typography, Box, Divider } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Payments from '../../utils/payment';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CartPage = props => {

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)
  const [showTotal, setShowTotal] = useState(false)

  const userData = props.userData;

  const getCartItems = useCallback(async cartItems => {
    const request = await Axios.get(
      `/api/product/product_by_id?id=${cartItems}&type=array`
    ).then(res => {
      userData.cart.forEach(cartItem => {
        res.data.product.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            res.data.product[index].quantity = cartItem.quantity;
          }
        });
      });
      return res.data;
    });
    return request;
  }, [userData.cart])

  const getProduct = useCallback(async cartItems => {
    const result = await getCartItems(cartItems);
    return result.product
  }, [getCartItems])

  let totalAmount = useCallback(() => {
    let total = 0;
    products.length > 0 && products.map(
      product => (total += parseInt(product.price, 10) * product.quantity)
    );
    setTotal(total);
    setShowTotal(true)
  }, [products])

  const removeProduct = async id => {
    const request = await Axios.get(
      `/api/users/removeFromCart?id=${id}`
    ).then(res => {
      if (res.data.cart) {
        res.data.cart.forEach(cartItem => {
          res.data.productInfo.forEach((productDetail, index) => {
            if (cartItem.id === productDetail._id) {
              res.data.productInfo[index].quantity = cartItem.quantity;
            }
          });
        });
      }
      return res.data;
    });
    window.location.reload();
  };

  const payment = data => {
    let body = {
      paymentData: data,
      cartData: products
    }
    Axios.post('/api/users/successBuy', body).then(res => {
      if(res.data.success) {
        setPurchaseSuccess(true)
        setProducts(res.data.cartData)
      } else {
        alert('결제에 실패했습니다.')
      }
    })
  }

  const cartInfo = useCallback(async () => {
    let cartItems = [];

    if (userData && userData.cart) {
      if (userData.cart.length > 0) {
        userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        const product = await getProduct(cartItems);
        setProducts(product)
      } else {
        return;
      }
    }
  }, [userData, getProduct])

  useEffect(
    () => {
      cartInfo()
    },
    [setProducts, userData, cartInfo]
  );

  useEffect(
    () => {
      totalAmount();
    },
    [products, totalAmount]
  );

  return (<>
    <section className={styles.cartpage}>
      <div className={styles.carttext}>
        <Typography
          variant="h5"
          sx={{ pt: 1, fontWeight: 500, color: "#3B2E45" }}
        >
          장바구니
        </Typography>
      </div>
      <UserCards products={products} removeProduct={removeProduct} />

      {total !== 0 && showTotal
        ? <><Divider sx={{ mt: 4}}/>
          <div className={styles.total}>
            <Typography variant="h6">
              총 주문금액: {total}원
            </Typography>
            <div className={styles.payment}>
            {total !== 0 &&
              <Payments total={total} onSuccess={payment} />}
          </div>
          </div>
          <Divider /></>
        : purchaseSuccess ?
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 3}}>
            <CheckCircleOutlineIcon sx={{ fontSize: '100px', color: 'green' }} />
            <Typography variant="h5">Your Purchase was successful!</Typography>
          </Box> 
          :
          <div className={styles.emptycart}>
            <AddShoppingCartIcon
              sx={{ fontSize: "100px", mt: 3, color: "#ddd" }}
            />
            <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
              No Items In Your Cart
            </Typography>
          </div>}


    </section>
    </>
  );
};

export default CartPage;
