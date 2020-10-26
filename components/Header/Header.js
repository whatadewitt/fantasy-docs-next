import React from "react";

import styles from "./Header.module.scss";
import cx from "classnames";

import Logo from "../../assets/images/yahoo-symbol.svg";
import Trophy from "../../assets/images/trophy-solid.svg";

const Header = () => (
  <header className={styles.wrapper}>
    <div className={cx(styles.icon, styles.logo)}>
      <Logo />
      <div className={styles.title}>
        <span className={styles.hidden}>yahoo </span>fantasy api
      </div>
    </div>
    <div className={styles.icon}>
      <Trophy />
    </div>
  </header>
);

export default Header;
