import React from "react";

function RecursosAcessibilidade({ tw }) {
  return (
    <section className={tw`w-full max-w-7xl bg-green-50 rounded-2xl p-10 mt-12 mx-auto shadow`}>
      <h2 className={tw`text-4xl font-bold text-green-700 text-center mb-10`}>Recursos de Acessibilidade</h2>
      <div className={tw`grid grid-cols-1 md:grid-cols-3 gap-8`}>
        {/* Card 1 */}
        <div className={tw`bg-white rounded-xl p-8 shadow flex flex-col`}>
          <span className={tw`text-4xl text-green-700 mb-2`} role="img" aria-label="acessibilidade">♿</span>
          <span className={tw`text-2xl font-bold text-green-700 mb-2`}>Alto Contraste</span>
          <span className={tw`text-lg text-green-900`}>Modo de alto contraste para melhorar a visibilidade do conteúdo.</span>
        </div>
        {/* Card 2 */}
        <div className={tw`bg-white rounded-xl p-8 shadow flex flex-col`}>
          <span className={tw`text-4xl text-green-700 mb-2`} role="img" aria-label="leitor de texto">🔊</span>
          <span className={tw`text-2xl font-bold text-green-700 mb-2`}>Leitor de Texto</span>
          <span className={tw`text-lg text-green-900`}>Tecnologia TTS (Text-to-Speech) embutida para leitura de conteúdo.</span>
        </div>
        {/* Card 3 */}
        <div className={tw`bg-white rounded-xl p-8 shadow flex flex-col`}>
          <span className={tw`text-4xl text-green-700 mb-2`} role="img" aria-label="teclado">⌨️</span>
          <span className={tw`text-2xl font-bold text-green-700 mb-2`}>Navegação por Teclado</span>
          <span className={tw`text-lg text-green-900`}>Interface compatível com teclado, sem necessidade de mouse.</span>
        </div>
        {/* Card 4 */}
        <div className={tw`bg-white rounded-xl p-8 shadow flex flex-col`}>
          <span className={tw`text-4xl text-green-700 mb-2`} role="img" aria-label="legendas">🔈</span>
          <span className={tw`text-2xl font-bold text-green-700 mb-2`}>Legendas</span>
          <span className={tw`text-lg text-green-900`}>Legendas em vídeos e audiodescrição nas atividades narradas.</span>
        </div>
        {/* Card 5 */}
        <div className={tw`bg-white rounded-xl p-8 shadow flex flex-col`}>
          <span className={tw`text-4xl text-green-700 mb-2`} role="img" aria-label="tempo flexível">📊</span>
          <span className={tw`text-2xl font-bold text-green-700 mb-2`}>Tempo Flexível</span>
          <span className={tw`text-lg text-green-900`}>Possibilidade de pausar tempo nos quizzes, ideal para TDAH/TEA.</span>
        </div>
        {/* Card 6 */}
        <div className={tw`bg-white rounded-xl p-8 shadow flex flex-col`}>
          <span className={tw`text-4xl text-green-700 mb-2`} role="img" aria-label="texto ajustável">🔠</span>
          <span className={tw`text-2xl font-bold text-green-700 mb-2`}>Texto Ajustável</span>
          <span className={tw`text-lg text-green-900`}>Opções para aumentar o tamanho da fonte e melhorar a legibilidade.</span>
        </div>
      </div>
    </section>
  );
}

export default RecursosAcessibilidade;