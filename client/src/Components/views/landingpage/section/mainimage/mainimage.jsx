import React, { useEffect, useState } from "react";
import styles from "./mainimage.module.css";

import Axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Mainimage = props => {
  const [images, setImages] = useState([]);
  const settings = {
    dots: true,
    speed: 500,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const getImages = async () => {
    const request = await Axios.get("api/images/getMainImages").then(res => {
      if (res.data.success) {
        return res.data.arr1;
      } else {
        console.log("에러");
      }
    });
    return request;
  };

  useEffect(
    () => {
      queueMicrotask(async () => {
        let arr = await getImages();
        let arr2 = Object.values(arr);
        const data = arr2.splice(0, 3);
        setImages(data);
      });
    },
    [setImages]
  );

  return (
    <section className={styles.mainImage}>
      <Slider {...settings}>
        {images
          ? images.map((image, index) =>
              <div key={index}>
                <img
                  className={styles.images}
                  src={`${image}`}
                  alt="carousel"
                />
              </div>
            )
          : ""}
      </Slider>
    </section>
  );
};

export default Mainimage;
