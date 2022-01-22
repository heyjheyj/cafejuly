import React from "react";
import styles from "./footer.module.css";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const Footer = props => {
  return (
    <section className={styles.footer}>
      <h3>Hello Everyone</h3>
      <EmojiEmotionsIcon sx={{ ml: 1 }} />
    </section>
  );
};

export default Footer;
