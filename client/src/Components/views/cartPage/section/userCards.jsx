import React from "react";
import styles from "./userCards.module.css";
import { Button } from "@mui/material";

const UserCards = ({ products, removeProduct }) => {
  console.log("[userCartData]products", products);

  const renderCartImage = images => {
    if (images.length > 0) {
      let image = images[0];
      return `${image}`;
    }
  };

  const renderItems =
    products.length > 0 &&
    products.map((product, index) =>
      <tr key={index} className={styles.detailtable}>
        <td className={styles.productInfo}>
          <img
            className={styles.cartimage}
            alt="product"
            src={renderCartImage(product.images)}
          />
          <div className={styles.productDetail}>
            <span className={styles.productname}>
              {product.productname}
            </span>
            <span className={styles.description}>
              {product.description}
            </span>
            <span className={styles.price}>
              {product.price}원
            </span>
          </div>
        </td>
        <td className={styles.bodyquantity}>
          {product.quantity} 개
        </td>
        <td className={styles.bodyprice}>
          {product.quantity * product.price}원
        </td>
        <td className={styles.bodyremove}>
          <Button
            className={styles.removeBtn}
            onClick={() => removeProduct(product._id)}
            key={product.id}
          >
            Remove
          </Button>
        </td>
      </tr>
    );

  return (
    <div className={styles.userCards}>
      <table>
        <thead>
          <tr className={styles.tablehead}>
            <th className={styles.headname}>상품정보</th>
            <th className={styles.headquantity}>수량</th>
            <th className={styles.headprice}>가격</th>
            <th className={styles.headremove}>장바구니에서 삭제하기</th>
          </tr>
        </thead>

        <tbody>
          {renderItems}
        </tbody>
      </table>
    </div>
  );
};

export default UserCards;
