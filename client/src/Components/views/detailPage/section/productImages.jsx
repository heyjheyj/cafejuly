import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./productImages.module.css";

const ProductImages = ({ product }) => {
  const [images, setImages] = useState([]);
  console.log(product.images);

  useEffect(
    () => {
      queueMicrotask(async () => {
        let newImages = await product.images;
        setImages(newImages);
      });
    },
    [product, images]
  );

  const settings = {
    dots: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <section className={styles.imageSlider}>
      <Slider {...settings}>
        {images
          ? images.map((image, index) =>
              <div key={index}>
                <img
                  className={styles.images}
                  src={`${image}`}
                  alt="carouselimg"
                />
              </div>
            )
          : ""}
      </Slider>
    </section>
  );
};

export default ProductImages;
