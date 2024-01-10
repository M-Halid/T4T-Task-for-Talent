import styles from "./Nav.module.css";
import logo from "../../assets/logo-placeholder-image.png.webp";

export const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.nav__logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.nav__links}>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>

        <a href="/login">Login</a>
      </div>
    </div>
  );
};
