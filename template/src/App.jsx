// import Inicio from "../src/components/LargeComponents/Inicio";
import { Navigate, Route, Routes } from "react-router-dom";
// import Calendar from "./components/LargeComponents/Calendar";
import "../assets/sass/main.scss";
import MainWrapper from "./components/SmallComponents/MainWrapper";
// import Calendar from "./components/LargeComponents/Calendar";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<MainWrapper />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
