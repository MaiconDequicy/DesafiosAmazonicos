import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecursosAcessibilidade from "../components/RecursosAcessibilidade";
import CardQuiz from "../components/CardQuiz";
import CardModoJogo from "../components/CardModoJogo";
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
    
      {/* Card principal */}
      <main className={tw`flex flex-col items-center mt-8`}>
        <div
          className={tw`w-full max-w-6xl rounded-2xl shadow-lg p-12 bg-cover bg-center mb-8`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
          }}
        >
          <h1 className={tw`text-5xl font-bold text-white mb-4`}>Desafios Amazônicos</h1>
          <p className={tw`text-2xl text-white mb-8`}>
            Explore e aprenda sobre a maior floresta tropical do mundo através de quizzes interativos. Descubra a rica biodiversidade, cultura e os desafios de preservação da Amazônia.
          </p>
          <button
            className={tw`bg-yellow-400 hover:bg-yellow-500 text-2xl font-bold px-8 py-3 rounded shadow`}
          >
            Começar o Desafio
          </button>
        </div>

        {/* Categorias de Quiz */}
        <h2 className={tw`text-3xl font-bold text-green-700 mb-6`}>Categorias de Quiz</h2>

        <div className={tw`w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-12`}>
        <CardQuiz
          tw={tw}
          image="https://images.unsplash.com/photo-1610413341456-e283a1c6026f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Clima e ciclo das águas"
          description="Teste seus conhecimentos sobre o regime de chuvas, enchentes e o ciclo das águas na região amazônica."
          questions={5}
          onStart={() => {}}
        />
        <CardQuiz
          tw={tw}
          image="https://images.unsplash.com/photo-1736444789361-5143b14f61e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Saberes dos ribeirinhos e povos originários"
          description="Descubra a sabedoria ancestral dos povos que habitam a floresta há milênios."
          questions={8}
          onStart={() => {}}
        />
        <CardQuiz
          tw={tw}
          image="https://plus.unsplash.com/premium_photo-1686810855087-838adffd3170?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Fauna e flora amazônica"
          description="Conheça a incrível biodiversidade da Amazônia, suas plantas e animais únicos."
          questions={10}
          onStart={() => {}}
        />
        <CardQuiz
          tw={tw}
          image="https://media.istockphoto.com/id/1515621093/pt/foto/victoria-regia-in-amazon-brazil.webp?a=1&b=1&s=612x612&w=0&k=20&c=g87-D0LNyfntByr9BUKj7KQwXmpgX7eFQ6nbsrup0Xk="
          title="Cultura e festividades locais"
          description="Explore as tradições, festas e manifestações culturais dos povos amazônicos."
          questions={7}
          onStart={() => {}}
        />
        <CardQuiz
          tw={tw}
          image="https://media.istockphoto.com/id/1413147638/pt/foto/the-silhouette-of-a-small-canoe-on-the-guapor%C3%A9-river-at-dusk.webp?a=1&b=1&s=612x612&w=0&k=20&c=osNUFgAu_6obP1CiSFpnm6XgTcUnOyC81vwSL88Of_g="
          title="Sustentabilidade e preservação ambiental"
          description="Aprenda sobre os desafios de conservação e as iniciativas sustentáveis na Amazônia."
          questions={7}
          onStart={() => {}}
        />

        <CardModoJogo tw={tw}></CardModoJogo>
      </div>
      </main>
      <RecursosAcessibilidade tw={tw} />
      <Footer tw={tw} ></Footer>
      
    </div>
  );
}

export default Home;


