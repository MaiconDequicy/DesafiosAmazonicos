import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import CardQuiz from "../components/CardQuiz";
import { getVisibleQuizzes } from "../services/quizService";

function Quizzes({ tw }) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setNomeUsuario(user.displayName || user.email); 
        getVisibleQuizzes().then(setQuizzes);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      {/* Header */}
      <Header tw={tw} nomeUsuario={nomeUsuario} onMenuOpen={() => setSideMenuOpen(true)} />

      {/* SideMenu recebe função para abrir popup */}
      <SideMenu
        tw={tw}
        open={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
      />

      <main className={tw`flex flex-col items-center mt-8`}>
        {/* Categorias de Quiz */}
        <h2 className={tw`text-3xl font-bold text-green-700 mb-6`}>Quizzes Disponiveis</h2>
        <div className={tw`w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-12`}>
          {quizzes.length === 0 && (
            <div className={tw`col-span-3 text-center text-gray-500`}>
              Nenhum quiz disponível no momento.
            </div>
          )}
          {quizzes.map(quiz => (
            <CardQuiz
              key={quiz.id}
              tw={tw}
              image={quiz.image || quiz.questions[0]?.image || "https://via.placeholder.com/300x200"}
              title={quiz.title}
              description={quiz.description}
              questions={quiz.questions.length}
              onStart={() => navigate(`/quiz/${quiz.id}`)}
            />
          ))}
        </div>
      </main>
      <Footer tw={tw} />
    </div>
  );
}

export default Quizzes;