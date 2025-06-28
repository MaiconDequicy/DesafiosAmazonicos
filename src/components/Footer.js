import React from "react";

function Footer({ tw }) {
  return (
    <footer className={tw`bg-green-800 text-white px-12 py-10 mt-12 rounded-t-lg`}>
      <div className={tw`flex flex-col md:flex-row justify-between gap-12 mb-6`}>
        {/* Sobre */}
        <div>
          <h3 className={tw`text-2xl font-bold mb-2`}>Desafios Amazônicos</h3>
          <p className={tw`text-lg`}>
            Um projeto educacional para promover o conhecimento sobre a Amazônia de forma acessível e inclusiva.
          </p>
        </div>
        {/* Links rápidos */}
        <div>
          <h3 className={tw`text-2xl font-bold mb-2`}>Links Rápidos</h3>
          <ul className={tw`space-y-1 text-lg`}>
            <li>Início</li>
            <li>Categorias</li>
            <li>Acessibilidade</li>
            <li>Sobre o Projeto</li>
          </ul>
        </div>
        {/* Contato */}
        <div>
          <h3 className={tw`text-2xl font-bold mb-2`}>Contato</h3>
          <p className={tw`text-lg mb-2`}>
            <span role="img" aria-label="email">📧</span> contato@desafiosamazonicos.org
          </p>
          <div className={tw`flex gap-3 text-2xl`}>
            <span role="img" aria-label="livro">📘</span>
            <span role="img" aria-label="câmera">📷</span>
            <span role="img" aria-label="pássaro">🦜</span>
            <span role="img" aria-label="tv">📺</span>
          </div>
        </div>
      </div>
      <hr className={tw`border-green-700 mb-4`} />
      <div className={tw`flex flex-col md:flex-row justify-between items-center text-sm text-green-200`}>
        <span>© 2025 Desafios Amazônicos. Todos os direitos reservados.</span>
        <div>
          <button
            type="button"
            className={tw`hover:underline mr-4 bg-transparent border-none cursor-pointer p-0`}
          >
            Política de Privacidade
          </button>
          <button
            type="button"
            className={tw`hover:underline bg-transparent border-none cursor-pointer p-0`}
          >
            Termos de Uso
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;