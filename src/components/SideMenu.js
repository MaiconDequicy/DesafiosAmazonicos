import React from "react";

function SideMenu({ tw, open, onClose }) {
  return (
    <div
      className={tw`
        fixed top-0 left-0 h-full w-80 bg-green-800 text-white z-50 rounded-tr-xl rounded-br-xl shadow-lg
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{ minWidth: "300px" }}
    >
      <div className={tw`flex items-center justify-between px-6 py-5 border-b border-green-700`}>
        <span className={tw`text-2xl font-bold`}>Menu</span>
        <button onClick={onClose} className={tw`text-2xl`} aria-label="Fechar menu">×</button>
      </div>
      <nav className={tw`flex flex-col gap-6 px-8 py-6 text-lg`}>
        <a href="/" className={tw`flex items-center gap-3 hover:underline`}>
          <span className="material-icons-outlined">home</span> Início
        </a>
        <a href="/categorias" className={tw`flex items-center gap-3 hover:underline`}>
          <span className="material-icons-outlined">bar_chart</span> Categorias
        </a>
        <a href="/progresso" className={tw`flex items-center gap-3 hover:underline`}>
          <span className="material-icons-outlined">bar_chart</span> Meu Progresso
        </a>
        <a href="/acessibilidade" className={tw`flex items-center gap-3 hover:underline`}>
          <span className="material-icons-outlined">accessible</span> Acessibilidade
        </a>
        <a href="/sobre" className={tw`flex items-center gap-3 hover:underline`}>
          <span className="material-icons-outlined">info</span> Sobre o Projeto
        </a>
        <a href="/creditos" className={tw`flex items-center gap-3 hover:underline`}>
          <span className="material-icons-outlined">groups</span> Créditos dos Colaboradores
        </a>
      </nav>
    </div>
  );
}

export default SideMenu;