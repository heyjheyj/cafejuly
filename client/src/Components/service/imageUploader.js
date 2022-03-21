import Axios from "axios";

class ImageUploader {
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("upload_preset", "tnusuxtm");

    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    const result = await Axios.post(
      "https://api.cloudinary.com/v1_1/dj8b9wygu/image/upload",
      formData,
      config
    )
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    return result.url;
  }
}

export default ImageUploader;
