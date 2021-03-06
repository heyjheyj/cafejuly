import React, { useEffect } from "react";
import styles from "./purchased.module.css";

import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Purchased = ({ userData }) => {
    const navigate = useNavigate()

    const renderHistory = 
      userData?.history.length > 0 &&
        userData?.history.map((item, index) => {
            let d = new Date(item.dataOfPurchase)
            let result = d.toLocaleString()
            return(
              <tr key={index} className={styles.detailInfo}>
                <td>{item.name}</td>
                <td>{item.price}원</td>
                <td>{item.quantity}</td>
                <td>{result}</td>
              </tr> )})

    useEffect(() => {
      if(userData?.isAuth === undefined) {
        navigate('/')
      }
    }, [navigate, userData])

  return (
  <>
    <div className={styles.purchased}>
      <div className={styles.purchasedtext}>
        <Typography
          variant="h5"
          sx={{ pt: 1, fontWeight: 500, color: "#3B2E45" }}
        >
          구매내역
        </Typography>
      </div>
    <br />
      <table className={styles.tablebody}>
        <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date of Purchase</th>
            </tr>
        </thead>
        <tbody>
          {renderHistory}
        </tbody>
      </table>

      {userData?.history.length === 0  && 
        <div className={styles.emptycart}>
          <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
            No Purchased History
          </Typography>
        </div>
      }
    </div>
  </>
)
};

export default Purchased;
