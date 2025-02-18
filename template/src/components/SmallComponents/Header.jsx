import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../assets/sass/modules/SmallComponents/Header.module.scss";
import { GlobalWhiteIcon, NotionIcon } from "../../../assets/images/svgComponents.jsx";


const Header = () => {
  return (
    <header>
      <div className={styles.logoContainer}>
        <GlobalWhiteIcon />
      </div>
      <div className={styles.roleContainer}>
        {/* <p>{headerText}</p> */}
      </div>
      <div className={styles.userContainer}>
        <NotionIcon />
        {/* <p>{userData.userName}</p> */}
      </div>
    </header>
  );
};

export default Header;
