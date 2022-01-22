import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import styles from "./detailPage.module.css";
import { useParams, useNavigate } from "react-router-dom";

import { Box } from "@mui/system";
import { Grid } from "@mui/material";

import ProductImages from "./section/productImages";
import ProductDescription from "./section/productDescription";

import Comment from '../Comment/comment'

import User from '../../service/user'

const DetailPage = props => {
  const user = new User()
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  // console.log(productId);

  const addItemToCart = (id, quantities) => {
    console.log("add to cart:", id);
    console.log("add to cart:", quantities);
    
    let body = {
      productId: id,
      quantities: quantities
    };

    const request = user.addToCart(body)
    console.log('[Detail Page]add to cart:', request)
    navigate('/user/cart', { state: request })
  };

  const getProduct = useCallback(async () => {
    await Axios.get(
      `/api/product/product_by_id?id=${productId}&type=single`
    ).then(res => {
      if (res.data.product) {
        console.log(res.data.product[0]);
        setProduct(res.data.product[0]);
      } else {
        alert("상품정보를 가져오지 못했습니다.");
      }
    });
  }, [productId])

  const getAllComments = useCallback(async () => {
    let data = { 
      productId: productId 
    }

    const result = await Axios.post('/api/comment/getComments', data).then(res => {
      if(res.data.success) {
        console.log('[detail Page]get All Comments', res.data.comments)
        const datas = res.data.comments
        return datas
      } else {
        console.log('의견을 불어오지 못했습니다.')
      }
    })

    return result;
  }, [productId])

  const refreshFunction = (newComment) => {
    // setComments(...comments, newComment);
    setComments(comments.concat(newComment))
  }

  useEffect(
    () => {
      queueMicrotask(async () => {
        getProduct();
        let result = await getAllComments()
        setComments(result)
      })
    },
    [setProduct, getAllComments, getProduct]
  );

  return (
    <>
    <div className={styles.detailpage}>
      <section className={styles.detail}>
        <h1>
          {product.productname}
        </h1>
      </section>
    <br />
      <section className={styles.productdetail}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            margin: "auto"
          }}
        >
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6} lg={6}>
              <ProductImages product={product} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <ProductDescription
                product={product}
                addItemToCart={addItemToCart}
              />
            </Grid>
          </Grid>
        </Box>
      </section>
      <div className={styles.comment}>
      <p className={styles.comments}>Comments</p>
        <hr/>
          <Comment 
            user={props.userData} 
            productId={productId} 
            refreshFunction={refreshFunction} 
            comments={comments}
          />
        </div>
    </div>
    </>);
};

export default DetailPage;
