import Inicio from "../src/components/LargeComponents/Inicio";
import { Navigate, Route, Routes } from "react-router-dom";
import styles from  "../assets/sass/modules/Inicio.module.scss";

function App() {
  return (
      <div className={styles.main}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
  );
}

export default App;
