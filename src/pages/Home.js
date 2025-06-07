import React from "react";
import Footer from "../components/Footer";


function Home({ tw }) {
  return (
    <div>
      {/* Header */}
      <header className={tw`bg-green-700 text-white flex items-center px-8 py-4 rounded-b-lg shadow-md`}>
        {/* Ícone menu à esquerda */}
        <span className={tw`text-2xl cursor-pointer mr-4`}>&#9776;</span>
        {/* Título centralizado ocupando todo o espaço */}
        <span className={tw`flex-1 text-4xl font-bold text-center`}>Desafios Amazônicos</span>
      </header>

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
        {/* Aqui você pode adicionar cards de categorias futuramente */}

      </main>
      <Footer tw={tw} ></Footer>
    </div>
  );
}

export default Home;


