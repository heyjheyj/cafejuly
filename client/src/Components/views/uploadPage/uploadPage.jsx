import React, { useState, useEffect } from "react";
import styles from "./uploadPage.module.css";
import Axios from "axios";
import { Input, TextField, Typography } from "@mui/material";
import ImageUpload from "../../utils/ImageUpload";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const cookies = [
  { key: 1, value: "로투스아메리칸" },
  { key: 2, value: "말차쿠키" },
  { key: 3, value: "초코칩쿠키" },
  { key: 4, value: "클래식" },
  { key: 5, value: "피낭시에" },
  { key: 6, value: "까눌레" },
  { key: 7, value: "마들렌" }
];

const UploadPage = props => {
  console.log("[uploadPage]props", props);

  const navigate = useNavigate();

  const [productname, setProductname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [cookie, setCookie] = useState(1);
  const [image, setImage] = useState([]);

  const changeCookies = e => {
    console.log(e.currentTarget.value);
    setCookie(e.currentTarget.value);
  };

  const changeProductName = e => {
    setProductname(e.currentTarget.value);
    console.log("product name changed:", e.currentTarget.value);
  };

  const changeProductDescription = e => {
    setDescription(e.currentTarget.value);
    console.log("product name changed:", e.currentTarget.value);
  };

  const changeProductPrice = e => {
    setPrice(e.currentTarget.value);
    console.log("product name changed:", e.currentTarget.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!productname || !description || !price || !cookie || !image) {
      return alert("모든 값을 넣어주세요");
    }

    let product = {
      writer: props.userData._id,
      productname: productname,
      description: description,
      price: price,
      cookies: cookie,
      images: image
    };

    console.log(product);

    Axios.post("/api/product", product).then(res => {
      if (res.data.success) {
        console.log(res.data);
        alert("상품을 업로드 했습니다.");
        navigate("/");
      } else {
        alert("상품 업로드에 실패했습니다.");
      }
    });
  };

  useEffect(
    () => {
      if (!props.userData.isAuth) {
        navigate("/");
      }
    },
    [navigate, props.userData.isAuth]
  );

  const refreshImages = newImages => {
    setImage(newImages);
  };

  return (
    <div className={styles.upload}>
      <section className={styles.uploadPage}>
        <div className={styles.uploadtext}>
          <Typography
            variant="h5"
            sx={{ pt: 1, fontWeight: 500, color: "#3B2E45" }}
          >
            Products Upload
          </Typography>
        </div>

        <form className={styles.uploadform} onSubmit={onSubmit}>
          <section className={styles.imagesUpload}>
            <ImageUpload refreshImages={refreshImages} />
          </section>
          <section className={styles.inputfield}>
            <span className={styles.inputTitle}>상품 정보를 입력해주세요.</span>
            <Box sx={{ display: "flex", flexDirection: "row", mt: 4, ml: 3 }}>
              <Typography variant="body1" sx={{ color: "#3B2E45" }}>
                이름
              </Typography>
              <Input
                sx={{
                  ml: 4.5,
                  borderBottom: "1px solid #B178DE50"
                }}
                onChange={changeProductName}
                value={productname}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", mt: 4, ml: 3 }}>
              <Typography sx={{ color: "#3B2E45" }} variant="body1">
                설명
              </Typography>
              <TextField
                sx={{
                  ml: 4.5,
                  width: "70%",
                  border: "1px solid #B178DE50",
                  borderRadius: "5px"
                }}
                multiline
                rows={4}
                onChange={changeProductDescription}
                value={description}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", mt: 4, ml: 3 }}>
              <Typography variant="body1" sx={{ color: "#3B2E45" }}>
                가격(원)
              </Typography>
              <Input
                sx={{
                  ml: 2,
                  textAlign: "center",
                  borderBottom: "1px solid #B178DE50"
                }}
                type="number"
                onChange={changeProductPrice}
                value={price}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", mt: 4, ml: 3 }}>
              <Typography variant="body1" sx={{ color: "#3B2E45" }}>
                종류
              </Typography>
              <select
                className={styles.cookies}
                onChange={changeCookies}
                value={cookie}
              >
                {cookies.map(place =>
                  <option key={place.key} value={place.key}>
                    {place.value}
                  </option>
                )}
              </select>
            </Box>
            <button
              className={styles.submitBtn}
              type="submit"
              onClick={onSubmit}
            >
              업로드
            </button>
          </section>
        </form>
      </section>
    </div>
  );
};

export default UploadPage;
