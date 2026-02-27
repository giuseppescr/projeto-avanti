import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import ConhecimentosPage from "./pages/ConhecimentosPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/conhecimentos" element={<ConhecimentosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
