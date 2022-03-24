import Axios from "axios";

class User {
  async login(data) {
    const result = await Axios.post("/api/users/login", data).then((res) => {
      if (res.data.loginSuccess) {
        window.localStorage.setItem("userId", res.data.userId);
        window.location.reload();
      } else if (res.data.loginSuccess === false) {
        alert("비밀번호가 틀렸습니다.");
      } else {
        alert("로그인에 실패했습니다.");
      }
    });
    return result;
  }

  async logout() {
    const result = await Axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        window.localStorage.removeItem("userId");
        window.location.reload();
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
    return result;
  }

  async registerUser(body) {
    const result = await Axios.post("/api/users/register", body).then((res) => {
      if (res.data.success) {
        return res.data.success;
      } else {
        alert("등록에 실패했습니다.");
      }
    });
    return result;
  }

  async addToCart(body) {
    const result = await Axios.post("/api/users/addToCart", body).then(
      (res) => {
        if (res.data) {
          window.location.reload();
          return res.data;
        } else {
          alert("장바구니에 넣지 못했습니다.");
        }
      }
    );
    return result;
  }

  async getUser() {
    const result = await Axios.get("/api/users/auth").then((res) => {
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
