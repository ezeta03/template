import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StrictMode } from 'react'

// import ConsentimientoJuegos from './components/LargeComponents/ConsentimientoJuegos.jsx'
// import { ClickToComponent } from "click-to-react-component";

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
      
    </BrowserRouter>
  </StrictMode >
)
