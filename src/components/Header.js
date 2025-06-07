import React from "react";

function Header({ tw }) {
  return (
    <header className={tw`bg-green-700 text-white flex items-center px-8 py-4 rounded-b-lg shadow-md`}>
      {/* Ícone menu à esquerda */}
      <span className={tw`text-2xl cursor-pointer mr-4`}>&#9776;</span>
      {/* Título centralizado ocupando todo o espaço */}
      <span className={tw`flex-1 text-4xl font-bold text-center`}>Desafios Amazônicos</span>
    </header>
  );
}

export default Header;