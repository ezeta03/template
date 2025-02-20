import React, { useState } from "react";
import styles from "../../../assets/sass/modules/SmallComponents/Aside.module.scss";
// import logoExtended from "../../../assets/images/192.webp"; // Ruta del logo extendido
import logoCollapsed from "../../../assets/images/180.webp"; // Ruta del logo colapsado
import { GlobalBlueIcon } from "../../../assets/images/svgComponents.jsx";

const Aside = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleAside = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`${styles.aside} ${isCollapsed ? styles.collapsed : ""}`}>
      <button onClick={toggleAside} className={styles.toggleButton}>
      {isCollapsed ? "Expand" : "Collapse"}

      </button>
      <div className={styles.content}>
        {/* Contenido del Aside */}
      </div>
    </aside>
  );
};

export default Aside;