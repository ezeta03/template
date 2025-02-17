// import { useNavigate } from "react-router-dom";
import styles from "../../../assets/sass/modules/SmallComponents/Aside.module.scss";
// import { AsideImage } from "../../../assets/images/svgComponents.jsx";
// import sideBarImage from "../../../assets/images/aside.svg";

const Aside = () => {

  return (
    <aside className={styles.aside}>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/calendar">Calendar</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
      <div className={styles.image}>
        {/* <AsideImage /> */}
      </div>
      <div className={styles.version}>
        v1.0.0
      </div>
    </aside>
  );
};

export default Aside;
