import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecursosAcessibilidade from "../components/RecursosAcessibilidade";
// import CardQuiz from "../components/CardQuiz"; // Removido
// import CardModoJogo from "../components/CardModoJogo"; // Removido
import SideMenu from "../components/SideMenu";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Home({ tw }) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setNomeUsuario(user.displayName || user.email);
      } else {
        // Se não estiver logado, redireciona para login
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      {/* Header */}
      <Header tw={tw} nomeUsuario={nomeUsuario} onMenuOpen={() => setSideMenuOpen(true)}/>

      {/* SideMenu recebe função para abrir popup */}
      <SideMenu
        tw={tw}
        open={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
      />
    
      {/* Banner principal */}
      <main className={tw`flex flex-col items-center mt-8`}>
        <div
          className={tw`w-full max-w-6xl rounded-2xl shadow-lg p-12 bg-cover bg-center mb-8 flex flex-col items-center justify-center`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
          }}
        >
          <h1 className={tw`text-5xl font-bold text-white mb-4 text-center`}>Desafios Amazônicos</h1>
          <p className={tw`text-2xl text-white mb-8 text-center`}>
            Explore e aprenda sobre a maior floresta tropical do mundo através de quizzes interativos. Descubra a rica biodiversidade, cultura e os desafios de preservação da Amazônia.
          </p>
          <button
            className={tw`bg-yellow-400 hover:bg-yellow-500 text-2xl font-bold px-8 py-3 rounded shadow`}
            onClick={() => navigate("/quizzes")}
          >
            Começar o Desafio
          </button>
        </div>
        <RecursosAcessibilidade tw={tw} />
      </main>
      <Footer tw={tw} ></Footer>
    </div>
  );
}

export default Home;


