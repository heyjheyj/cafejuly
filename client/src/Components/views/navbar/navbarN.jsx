import React from "react";
import styles from "./navbar.module.css";

import { Link } from "react-router-dom";

const NavbarN = props => {
  return (
    <div className={styles.nav}>
      <section className={styles.navbar}>
        <Link to="/">
          <div className={styles.logo}>
            <img
              alt="logoimg"
              className={styles.logoimg}
              src="/images/logoimg.gif"
            />
            <img
              alt="mainlogo"
              className={styles.mainlogo}
              src="/images/mainlogo.gif"
            />
          </div>
        </Link>
      </section>
    </div>
  );
};

export default NavbarN;
