import Axios from "axios";

class Product {
  removeProduct = async (id) => {
    console.log("remove Product", id);
    const request = await Axios.get(`/api/users/removeFromCart?id=${id}`).then(
      (res) => {
        if (res.data.cart) {
          res.data.cart.forEach((cartItem) => {
            res.data.productInfo.forEach((productDetail, index) => {
              // console.log("product Detail:", productDetail);
              if (cartItem.id === productDetail._id) {
                // console.log("products:", response.data.product);
                res.data.productInfo[index].quantity = cartItem.quantity;
              }
            });
          });
        }
      }
    );
  };

  getProduct = async (productId) => {
    await Axios.get(
      `/api/product/product_by_id?id=${productId}&type=single`
    ).then((res) => {
      if (res.data.product) {
        console.log(res.data.product[0]);
        // setProduct(res.data.product[0]);
      } else {
        alert("상품정보를 가져오지 못했습니다.");
      }
    });
  };

  addItemToCart = (id) => {
    console.log("add to cart:", id);
    let body = {
      productId: id
    };

    Axios.post("/api/users/addToCart", body).then((res) => {
      if (res.data) {
        console.log(res.data);
        // navigate("/user/cart", { state: res.data });
      } else {
        alert("장바구니에 넣지 못했습니다.");
      }
    });
  };

  getProducts = async (props) => {
    console.log("[Service - Product]getProducts props", props);
    const request = await Axios.post("/api/product/products", props).then(
      (res) => {
        if (res.data.success) {
          console.log("[Service - Product]getProducts result:", res.data);
          return res.data;
        } else {
          alert("상품 정보를 가져오는데 실패했습니다.");
        }
      }
    );
    return request;
  };

  uploadProducts(product) {
    Axios.post("/api/product", product).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        alert("상품을 업로드 했습니다.");
        // navigate("/");
      } else {
        alert("상품 업로드에 실패했습니다.");
      }
    });
  }
}

export default Product;
