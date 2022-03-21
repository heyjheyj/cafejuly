import React from "react";
import styles from "./ImageUpload.module.css";
import Dropzone from "react-dropzone";
import { useState } from "react";
import ImageUploader from "../service/imageUploader";

const imageuploader = new ImageUploader();

const ImageUpload = props => {
  const [images, setImages] = useState([]);

  const dropHandler = async files => {
    const uploaded = await imageuploader.upload(files);
    setImages([...images, uploaded]);
    props.refreshImages([...images, uploaded]);

    //localhost에 test

    // let formData = new FormData();
    // const config = {
    //   headers: { "Content-Type": "multipart/form-data" }
    // };
    // formData.append("file", files[0]);

    // Axios.post("/api/product/image", formData, config).then(res => {
    //   if (res.data.success) {
    //     console.log(res.data);
    //     setImages([...images, res.data.filePath]);
    //     props.refreshImages([...images, res.data.filePath]);
    //   } else {
    //     alert("이미지 저장에 실패했습니다.");
    //   }
    // });
  };

  const onDeleteImage = image => {
    const currentIndex = images.indexOf(image);

    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshImages(newImages);
  };

  return (
    <div className={styles.box}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) =>
          <section className={styles.imagesupload}>
            <div className={styles.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              <span className={styles.dropzoneText}>이미지 업로드하기</span>
              <br />
              <span className={styles.dropzoneInfo}>
                (여러개 이미지 업로드가 가능합니다. <br />미리보기를 스크롤해주세요.)
              </span>
            </div>
          </section>}
      </Dropzone>
      <section className={styles.showimages}>
        {images.length > 0
          ? images.map((image, index) =>
              <div
                key={index}
                className={styles.imgbox}
                onClick={() => onDeleteImage(image)}
              >
                <img alt={index} className={styles.image} src={`${image}`} />
              </div>
            )
          : <div className={styles.empty}>이미지가 없어요.</div>}
      </section>
    </div>
  );
};

export default ImageUpload;
