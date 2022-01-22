import Axios from "axios";

class User {
  login(data) {
    Axios.post("/api/users/login", data).then((res) => {
      console.log("[login]login res:", res);
      if (res.data.loginSuccess) {
        console.log(res.data.userId);
        window.localStorage.setItem("userId", res.data.userId);
        window.location.reload();
      } else if (res.data.loginSuccess === false) {
        alert("비밀번호가 틀렸습니다.");
      } else {
        alert("로그인에 실패했습니다.");
      }
    });
  }

  logout() {
    Axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        console.log("logout succeded: ", res.data);
        window.localStorage.removeItem("userId");
        window.location.reload();
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  }

  register(body) {
    Axios.post("/api/users/register", body).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        return res.data;
      } else {
        alert("등록에 실패했습니다.");
      }
    });
  }

  addToCart(body) {
    Axios.post("/api/users/addToCart", body).then((res) => {
      if (res.data) {
        console.log("[Auth]add to cart:", res.data);
        // window.location.reload();
        return res.data;
      } else {
        alert("장바구니에 넣지 못했습니다.");
      }
    });
  }

  async getUser() {
    const result = await Axios.get("/api/users/auth").then((res) => {
      console.log("[Auth]get userData:", res.data);
      if (res.data) {
        return res.data;
      } else {
        alert("fail to get userData");
      }
    });
    return result;
  }
}

export default User;