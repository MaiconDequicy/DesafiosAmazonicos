import React from "react";

function CardModoJogo({ tw, onEscolher }) {
  return (
    <div
      className={tw`max-w-xl w-full rounded-2xl shadow-lg p-8 bg-gradient-to-br from-blue-400 to-green-400`}
    >
      <h2 className={tw`text-3xl font-bold text-white mb-8`}>Modos de Jogo</h2>

      <div className={tw`mb-6`}>
        <div className={tw`bg-white bg-opacity-30 rounded-lg p-5 mb-4`}>
          <span className={tw`block text-xl font-bold text-white mb-1`}>Aprender Jogando</span>
          <span className={tw`text-white`}>Feedback imediato e explicação após cada pergunta.</span>
        </div>
        <div className={tw`bg-white bg-opacity-30 rounded-lg p-5`}>
          <span className={tw`block text-xl font-bold text-white mb-1`}>Desafio do Sábio Ribeirinho</span>
          <span className={tw`text-white`}>Modo acumulativo com níveis e pontuação.</span>
        </div>
      </div>

      <button
        className={tw`w-full bg-yellow-400 hover:bg-yellow-500 text-xl font-bold py-4 rounded-lg mt-4`}
        onClick={onEscolher}
      >
        Escolher Modo
      </button>
    </div>
  );
}

export default CardModoJogo;