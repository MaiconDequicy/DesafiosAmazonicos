import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

function App({ tw }) {
  return (
    <BrowserRouter>
      <div className={tw`min-h-screen bg-green-100`}>
        <Routes>
          <Route path="/" element={<Login tw={tw} />} />
          <Route path="/login" element={<Login tw={tw} />} />
          <Route path="/cadastro" element={<Cadastro tw={tw} />} />
          <Route path="/home" element={<Home tw={tw} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;