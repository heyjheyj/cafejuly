/* eslint-disable */

import styles from "./app.module.css";
import Landingpage from "./Components/views/landingpage/landingpage";
import Navbar from "./Components/views/navbar/navbar";
import NavbarN from "./Components/views/navbar/navbarN";
import { Route, Routes } from "react-router-dom";

import Login from "./Components/views/login/login";
import Register from "./Components/views/register/register";
import UploadPage from "./Components/views/uploadPage/uploadPage";
import DetailPage from "./Components/views/detailPage/detailPage";
import CartPage from "./Components/views/cartPage/cartPage";
import Purchased from "./Components/views/purchased/purchased";
import User from './Components/service/user'

import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState();
  const user = new User()

  useEffect(() => {
    queueMicrotask(async () => {
      let userdata = await user.getUser();
      setUserData(userdata);
    });
  }, [setUserData]);

  return (<>
    {userData ? 
        <Navbar userData={userData} />
          : <NavbarN />}
          <section className={styles.app}>
        <Routes>
            <Route path="/" element={<Landingpage userData={userData} />} />
            <Route path="/login" element={<Login userData={userData} />} />
            <Route path="/register" element={<Register userData={userData} />} />
            <Route path="/upload" element={<UploadPage userData={userData} />} />
            <Route path="/user/cart" element={<CartPage userData={userData} />} />
            <Route
              path="/product/:productId"
              element={<DetailPage userData={userData} />}
            />
            <Route path="/purchased" element={<Purchased userData={userData} />} />
          </Routes>
          </section>
    </>
  );
}

export default App;
