import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Quizzes from "./pages/quizzes";
import AdminPage from "./pages/AdminPage";
import QuizPage from "./pages/QuizPage"; // Importando a nova página QuizPage
import Ranking from "./pages/Ranking";

function App({ tw }) {
  return (
    <BrowserRouter>
      <div className={tw`min-h-screen bg-green-100`}>
        <Routes>
          <Route path="/" element={<Login tw={tw} />} />
          <Route path="/login" element={<Login tw={tw} />} />
          <Route path="/cadastro" element={<Cadastro tw={tw} />} />
          <Route path="/home" element={<Home tw={tw} />} />
          <Route path="/quizzes" element={<Quizzes tw={tw} />} />
          <Route path="/quiz/:quizId" element={<QuizPage tw={tw} />} /> {/* Nova rota para QuizPage */}
          <Route path="/admin" element={<AdminPage tw={tw} />} />
          <Route path="/ranking" element={<Ranking tw={tw} />}></Route>
          <Route path="*" element={<Login tw={tw} />} /> // Redireciona para Login se a rota não existir
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;