import React, { useState } from "react";
import styles from "./navbar.module.css";

import User from "../../service/user";
import Badge from "@mui/material/Badge";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import { Link } from "react-router-dom";
import { Box } from '@mui/system';

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [cartItems, setCartItems] = useState();
  const user = new User();

  console.log('[Navbar]props:', props.userData)

  const logout = () => {
    user.logout();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.nav}>
    <section className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}>
          <img alt="logoimg" className={styles.logoimg} src="/images/logoimg.gif" />
          <img alt="mainlogo" className={styles.mainlogo} src="/images/mainlogo.gif" />
        </div>
      </Link>
      <div className={styles.guide}>
        {props.userData.isAuth
          ? <div className={styles.rightNav}>
              <div>
                <Link to="/upload">
                  <img alt="upload" className={styles.navimg} src="/images/upload.gif" />
                </Link>
              </div>
              <div>
                <Link to="/user/cart">
                  {props.userData.isAuth ? <Badge badgeContent={props.userData.cart.length} color="error">
                    <img alt="cart01" className={styles.navimgcart} src="/images/cart.gif" />
                  </Badge>
                    : <Badge badgeContent={0} color="error"><img alt="cart02" className={styles.navimgcart} src="/images/cart.gif" /></Badge>}

                </Link>
              </div>
              <div>
                <Link to="/purchased">
                  <img alt="history" className={styles.navhistory} src="/images/history.gif" />
                </Link>
              </div>
                <img alt="logout" onClick={logout} className={styles.navimg} src="/images/logout.gif" />
            </div>
          : <>
              <Link to="/login">
                <img alt="login" className={styles.navimg} src="/images/signin.gif" />
              </Link>
              <Link to="/register">
                <img alt="register" className={styles.navimg} src="/images/signup.gif" />
              </Link>
            </>}
      </div>
      <div className={styles.response}>
        {props.userData.isAuth ? 
        <div>
        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ background: 'none', height: '30px'}}
        >
          <img className={styles.menuimg} alt="menu" src="/images/menu.png" />
        </Button>
        <Box sx={{ background: '#FFF6FF'}}>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          sx={{ background: 'none'}}
        >
          <MenuItem sx={{ background: 'none'}} onClick={handleClose}>
            <Link to="/upload">
              <img alt="upload" className={styles.navimg} src="/images/upload.gif" />
            </Link>
          </MenuItem>
          <MenuItem sx={{ background: 'none'}} onClick={handleClose}>
            <Link to="/user/cart">
              {props.userData.isAuth ? 
                <Badge badgeContent={props.userData.cart.length} color="error">
                  <img alt="cart01" className={styles.navimgcart} src="/images/cart.gif" />
                </Badge>
              : <Badge badgeContent={0} color="error">
                  <img alt="cart02" className={styles.navimgcart} src="/images/cart.gif" />
                </Badge>}
            </Link>
          </MenuItem>
          <MenuItem sx={{ background: 'none'}} onClick={handleClose}>
            <Link to="/purchased">
              <img alt="history" className={styles.navhistory} src="/images/history.gif" />
            </Link>
          </MenuItem>
          <MenuItem sx={{ background: 'none'}} onClick={handleClose}>
            <img alt="logout" onClick={logout} className={styles.navimg} src="/images/logout.gif" />
          </MenuItem>
        </Menu>
        </Box>
      </div>

          : <>
          <Link to="/login">
            <img alt="login" className={styles.navimg} src="/images/signin.gif" />
          </Link>
          <Link to="/register">
            <img alt="register" className={styles.navimg} src="/images/signup.gif" />
          </Link>
        </>}
        </div>
    </section>
    </div>
  );
};

export default Navbar;
